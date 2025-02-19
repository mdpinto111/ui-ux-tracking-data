import express from "express";
import livereload from "livereload";
import connectLivereload from "connect-livereload";

const app = express();
const port = 3000;

// Setup live reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(new URL("public", import.meta.url).pathname);

app.use(connectLivereload()); // Inject reload script

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Notify browser when a file changes
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
