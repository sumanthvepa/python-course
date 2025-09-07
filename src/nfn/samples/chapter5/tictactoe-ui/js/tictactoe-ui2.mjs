import { Application } from "./application.mjs";

async function main() {
  await new Promise((resolve) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", resolve);
    } else {
      resolve();
    }
  });

  let app = new Application();
  app.run();
}

main();