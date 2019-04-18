const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

async function createMovie(dailyRentalRate, title, numberInStock, genre) {
  const movie = new Movie({
    title,
    numberInStock,
    dailyRentalRate,
    genre: {
      name: genre.name,
      _id: genre._id
    }
  });
  return await movie.save();
}

router.get("/", async (req, res) => {
  res.send(await Movie.find());
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Invalid genre.");
  }
  res.send(
    await createMovie(
      req.body.dailyRentalRate,
      req.body.title,
      req.body.numberInStock,
      req.body.genre
    )
  );
});

module.exports = router;
