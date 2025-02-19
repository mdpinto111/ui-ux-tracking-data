import path from "path";

export default {
  entry: "./public/tracker.js",
  output: {
    filename: "tracker.bundle.js",
    path: path.resolve("public"),
  },
  mode: "production",
};
