const express = require("express");
const helmet = require("helmet");

const error = require("../middleware/error");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const auth = require("../routes/auth");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const customers = require("../routes/customers");

module.exports = function(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());

  app.use("/api/customers", customers);
  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/auth", auth);
  app.use("/api/users", users);

  app.use(error);
};
