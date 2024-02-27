// very simple fetch wrapper that's passed into SWR hooks:
// https://swr.vercel.app/docs/data-fetching#fetch
// note: fetch does *not* need to be poly/ponyfilled in Next.js:
// https://nextjs.org/blog/next-9-1-7#new-built-in-polyfills-fetch-url-and-objectassign

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = <T = any>(...args: Parameters<typeof fetch>): Promise<T> => fetch(...args).then((res) => res.json());

export default fetcher;
