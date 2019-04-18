const { Genre, validate } = require("../models/genre");

const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

async function updateGenre(id, name) {
  return await Genre.findByIdAndUpdate(
    id,
    { $set: { name: name } },
    { new: true }
  );
}

router.get("/", async (req, res) => {
  res.send(await Genre.find().sort("name"));
});

router.get("/:id", async (req, res) => {
  Genre.findById({ _id: req.params.id })
    .then(result => res.send(result))
    .catch(() => res.status(404).send("Invalid id"));
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  new Genre({
    name: req.body.name
  })
    .save()
    .then(result => res.send(result));
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  updateGenre(req.params.id, req.body.name)
    .then(result => res.send(result))
    .catch(() => res.status(404).send("Invalid id"));
});

router.delete("/:id", [auth, admin], async (req, res) => {
  Genre.deleteOne({ _id: req.params.id })
    .then(result => res.send(result))
    .catch(() => res.status(404).send("invalid id"));
});

module.exports = router;
