// very simple fetch wrapper that's passed into SWR hooks:
// https://swr.vercel.app/docs/data-fetching#fetch
// note: fetch does *not* need to be poly/ponyfilled in Next.js:
// https://nextjs.org/blog/next-9-1-7#new-built-in-polyfills-fetch-url-and-objectassign

// eslint-disable-next-line no-undef
export const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
