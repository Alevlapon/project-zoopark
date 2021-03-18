const express = require('express');
const { route } = require('.');
const router = express.Router();
const Animal = require('../models/animal');

router.get('/', async (req, res) => {
  let animals = await Animal.find()
  res.render('animal', {animals});
});

router.get('/:id', async (req,res) => {
  let animal = await Animal.findOne({_id:req.params.id})
  res.locals.animalPictures = animal.img
  res.locals.animalContent = animal.info
  res.locals.animalName = animal.name
  res.render('oneanimal')
})

module.exports = router;
