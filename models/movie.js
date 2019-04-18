const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      maxlength: 255,
      minlength: 5,
      trim: true,
      required: true
    },
    numberInStock: {
      type: Number,
      max: 255,
      min: 0,
      required: true
    },
    dailyRentalRate: {
      type: Number,
      max: 255,
      min: 0,
      required: true
    },
    genre: {
      type: genreSchema,
      required: true
    }
  })
);

function validateMovie(movie) {
  return Joi.validate(movie, {
    title: Joi.string()
      .required()
      .min(5)
      .max(255),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  });
}

exports.Movie = Movie;
exports.validate = validateMovie;
