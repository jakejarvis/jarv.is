import { registerOTel } from "@vercel/otel";

export const register = () => {
  registerOTel({
    serviceName: "jarvis",
  });
};
