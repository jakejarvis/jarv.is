import { registerOTel } from "@vercel/otel";

export const register = () => {
  if (process.env.VERCEL_ENV === "production") {
    registerOTel({
      serviceName: "jarvis",
    });
  }
};
