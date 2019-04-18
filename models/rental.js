const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        trim: true,
        maxlength: 50,
        minlength: 5,
        required: true
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        maxlength: 50,
        minlength: 5,
        required: true
      }
    }),
    required: true
  },

  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        maxlength: 255,
        minlength: 5,
        trim: true,
        required: true
      },
      dailyRentalRate: {
        type: Number,
        max: 255,
        min: 0,
        required: true
      }
    }),
    required: true
  },

  dateReturned: { type: Date },

  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },

  rentalFee: { type: Number, min: 0 }
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  return Joi.validate(rental, {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    rentalFee: Joi.number().min(0)
  });
}

exports.Rental = Rental;
exports.validate = validateRental;
