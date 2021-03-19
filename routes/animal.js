const express = require('express');
const { route } = require('.');
const router = express.Router();
const Animal = require('../models/animal');
const {adminChecker} = require('../midllewares/auth')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, cb) {
    cb(null, path.join(Date.now() + '-' + file.originalname.replace(/\.jpg/, '')))
  }
})
const upload = multer({ storage:storage })

router.get('/', async (req, res) => {
  let animals = await Animal.find()
  res.render('animal', {animals});
});

router.get('/:id', adminChecker, async (req,res) => {
  let animal = await Animal.findOne({_id:req.params.id})
  res.locals.animalPictures = animal.img
  res.locals.animalContent = animal.info
  res.locals.animalName = animal.name
  res.locals.animalId = animal._id
  res.render('oneanimal')
})
router.post('/:id',upload.single('filedata'), async (req,res) => {
  let path = `/images/${req.file.filename}`
  let animal = await Animal.findOne({_id:req.params.id})
  animal.img.push(path)
  await animal.save()
  res.redirect(`/animal/${req.params.id}`)
})
module.exports = router;
