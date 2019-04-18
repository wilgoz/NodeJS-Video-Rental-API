const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    minlength: 5,
    required: true
  }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  return Joi.validate(genre, {
    name: Joi.string()
      .required()
      .min(5)
      .max(255)
  });
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
