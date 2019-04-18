const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");

const auth = require("../middleware/auth");
const express = require("express");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  res.send(await Rental.find().sort("-dateOut"));
});

/*
 * Client input: customerID & movieID
 * Finds the customer and movie from the databases associated with their IDs
 * Creates a rental object, decrements rented movie
 * Transaction method: 2 phase commits
 */
router.post("/", auth, async (req, res) => {
  const { customerId, movieId, dateReturned, rentalFee } = req.body;

  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  const customer = await Customer.findById(customerId);
  if (!customer) {
    return res.status(400).send(error.details[0].message);
  }

  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(400).send("Invalid movie ID");
  }
  if (movie.numberInStock === 0) {
    return res.status(400).send("Movie out of stock");
  }

  const rental = new Rental({
    dateReturned: dateReturned,
    rentalFee: rentalFee,

    customer: {
      name: customer.name,
      _id: customer._id,
      phone: customer.phone
    },

    movie: {
      title: movie.title,
      _id: movie._id,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();
    res.send(rental);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
