// @ts-nocheck

// Fetches my Spotify most-played tracks or currently playing track.
// Heavily inspired by @leerob: https://leerob.io/snippets/spotify

import * as Sentry from "@sentry/node";
import fetch from "node-fetch";
import queryString from "query-string";
import type { NextApiRequest, NextApiResponse } from "next";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || "",
});

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

// https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
// https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-the-users-currently-playing-track
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
// https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).send(""); // 405 Method Not Allowed
    }

    // default to top tracks
    let response;

    // get currently playing track (/api/tracks/?now), otherwise top 10 tracks
    if (typeof req.query.now !== "undefined") {
      response = await getNowPlaying();

      // let Vercel edge cache results for 5 mins
      res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    } else {
      response = await getTopTracks();

      // let Vercel edge cache results for 3 hours
      res.setHeader("Cache-Control", "s-maxage=10800, stale-while-revalidate");
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    // log error to sentry, give it 2 seconds to finish sending
    Sentry.captureException(error);
    await Sentry.flush(2000);

    const message = error instanceof Error ? error.message : "Unknown error.";

    // 500 Internal Server Error
    return res.status(500).json({ success: false, message });
  }
};

const getAccessToken = async () => {
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

  return response.json();
};

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      // eslint-disable-next-line camelcase
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const active = await response.json();

  if (active.is_playing === true && active.item) {
    return {
      isPlaying: active.is_playing,
      artist: active.item.artists.map((artist) => artist.name).join(", "),
      title: active.item.name,
      album: active.item.album.name,
      imageUrl: active.item.album.images ? active.item.album.images[0].url : undefined,
      songUrl: active.item.external_urls.spotify,
    };
  }

  return { isPlaying: false };
};

const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      // eslint-disable-next-line camelcase
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const { items } = await response.json();

  return items.map((track) => ({
    artist: track.artists.map((artist) => artist.name).join(", "),
    title: track.name,
    album: track.album.name,
    imageUrl: track.album.images ? track.album.images[0].url : undefined,
    songUrl: track.external_urls.spotify,
  }));
};

export default handler;
