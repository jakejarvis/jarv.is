"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return <span>Something went very wrong! 😳</span>;
};

export default Error;
