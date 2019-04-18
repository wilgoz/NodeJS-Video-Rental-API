const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isAdmin: Boolean,
  name: {
    type: String,
    maxlength: 255,
    minlength: 5,
    required: true
  },
  email: {
    type: String,
    maxlength: 255,
    minlength: 5,
    unique: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 1024,
    minlength: 5,
    required: true
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      isAdmin: this.isAdmin,
      _id: this.id
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  return Joi.validate(user, {
    name: Joi.string()
      .required()
      .min(5)
      .max(255),
    email: Joi.string()
      .required()
      .min(5)
      .max(255)
      .email(),
    password: Joi.string()
      .required()
      .min(5)
      .max(255),
    isAdmin: Joi.boolean()
  });
}

exports.User = User;
exports.validate = validateUser;
