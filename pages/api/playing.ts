// Fetches my Spotify most-played tracks or currently playing track.
// Heavily inspired by @leerob: https://leerob.io/snippets/spotify

import queryString from "query-string";
import { NextResponse } from "next/server";
import type { Track } from "../../types";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

// https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
// https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-the-users-currently-playing-track
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
// https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10";

type SpotifyTrackSchema = {
  name: string;
  artists: Array<{
    name: string;
  }>;
  album: {
    name: string;
    images?: Array<{
      url: URL | string;
    }>;
  };
  imageUrl?: URL | string;
  external_urls: {
    spotify: URL | string;
  };
};

export const config = {
  runtime: "edge",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  const token = await getAccessToken();
  const [playing, top] = await Promise.all([getNowPlaying(token), getTopTracks(token)]);

  return NextResponse.json({ playing, top }, { status: 200 });
};

const getAccessToken = async () => {
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const { access_token: token } = await response.json();

  return token;
};

const getNowPlaying = async (token: string): Promise<Track | false> => {
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 204 || response.status > 400) {
    return false;
  }

  const active = (await response.json()) as {
    is_playing: boolean;
    item?: SpotifyTrackSchema;
  };

  if (active?.is_playing === true && active?.item) {
    return {
      artist: active.item.artists.map((artist) => artist.name).join(", "),
      title: active.item.name,
      album: active.item.album.name,
      image: active.item.album.images ? active.item.album.images[0].url : undefined,
      url: active.item.external_urls.spotify,
    };
  }

  return false;
};

const getTopTracks = async (token: string): Promise<Track[]> => {
  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const { items } = (await response.json()) as { items: SpotifyTrackSchema[] };

  const tracks = items.map<Track>((track) => ({
    artist: track.artists.map((artist) => artist.name).join(", "),
    title: track.name,
    album: track.album.name,
    image: track.album.images ? track.album.images[0].url : undefined,
    url: track.external_urls.spotify,
  }));

  return tracks;
};
