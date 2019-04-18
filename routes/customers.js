const { Customer, validate } = require("../models/customer");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await Customer.find());
});

router.get("/:id", async (req, res) => {
  Customer.findById({ _id: req.params.id })
    .then(result => res.send(result))
    .catch(() => res.status(404).send("Invalid id"));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  })
    .save()
    .then(result => res.send(result));
});

module.exports = router;
