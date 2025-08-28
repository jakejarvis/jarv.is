import { initBotId } from "botid/client/core";

initBotId({
  protect: [
    {
      path: "/contact",
      method: "POST",
    },
  ],
});
