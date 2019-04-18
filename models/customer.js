const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      minlength: 5,
      required: true
    },
    phone: {
      type: String,
      maxlength: 50,
      minlength: 5,
      required: true
    }
  })
);

function validateCustomer(customer) {
  return Joi.validate(customer, {
    name: Joi.string()
      .required()
      .min(5)
      .max(255),
    isGold: Joi.boolean(),
    phone: Joi.number().required()
  });
}

exports.Customer = Customer;
exports.validate = validateCustomer;
