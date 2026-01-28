"use client";

// marking the library as a proper client component so that react doesn't complain about hydration whenever we use it in
// a server component.
// see: https://react.dev/reference/rsc/use-client#using-third-party-libraries
export { default as CountUp } from "react-countup";
