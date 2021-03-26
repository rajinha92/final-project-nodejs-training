const express = require("express");
const PORT = process.env.PORT || 3000;
const adminRoutes = require("./routes/admin");
const fanRoutes = require("./routes/fan");
const authRoutes = require("./routes/auth");
const db = require("./db/mongo");

const registerRoutes = (app, namespace, routes) => {
  app.use(namespace, routes);
};

const init = () => {
  const app = express();
  app.use(express.json());
  registerRoutes(app, "/auth", authRoutes);
  registerRoutes(app, "/", fanRoutes);
  registerRoutes(app, "/admin", adminRoutes);
  db.connect();
  db.connection().once("open", () => console.log("Connected to Mongo"));
  app.listen(PORT);
  return app;
};

module.exports = { init };
