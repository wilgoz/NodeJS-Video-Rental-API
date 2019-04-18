const config = require("config");

module.exports = function() {
  // export vidly_jwtPrivateKey=$(PK)
  if (!config.get("jwtPrivateKey")) {
    throw new Error("jwtPrivateKey is not defined");
  }
};
