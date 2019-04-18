const { User } = require("../models/user");

const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

function validate(req) {
  return Joi.validate(req, {
    email: Joi.string()
      .required()
      .min(5)
      .max(255)
      .email(),
    password: Joi.string()
      .required()
      .min(5)
      .max(255)
  });
}

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) {
    return res.status(400).send("Invalid email or password");
  }

  res.send(user.generateAuthToken());
});

module.exports = router;
