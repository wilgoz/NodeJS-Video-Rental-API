/*
 * Exceptions will be handled by the error middleware by default
 * These include unhandled promise rejections & uncaught exceptions
 * Eliminates the need to equip exception handlers on every cases
 */

const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

app.get("/", (req, res) => {
  res.send("<h1>l33t frontend</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}`));
