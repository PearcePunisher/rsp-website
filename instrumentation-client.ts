import { initBotId } from "botid/client";

initBotId({
  protect: [
    {
      path: "/api/contact",
      method: "POST",
    },
  ],
});
