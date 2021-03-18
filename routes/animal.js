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

router.get('/',adminChecker, async (req, res) => {
  let animals = await Animal.find()
  res.render('animal', {animals});
});
router.get('/new', adminChecker, adminChecker,(req, res) => {
  // console.log("hghghjhghg");
  res.render('new')
})
router.post('/',adminChecker, upload.single('filedata'), async (req,res) => {
  const {name, info} = req.body
  console.log(name,info);
  let path = `/images/${req.file.filename}`
  console.log();
  await Animal.create({
    name,
    info,
    img: [path,path,path,path,path],
    frontImg: path
  })
  res.redirect("/animal")
})
router.get('/:id', adminChecker, async (req,res) => {
  let animal = await Animal.findOne({_id:req.params.id})
  res.locals.animalPictures = animal.img
  res.locals.animalContent = animal.info
  res.locals.animalName = animal.name
  res.locals.animalId = animal._id
  res.render('oneanimal')
})
router.post('/:id', adminChecker,upload.single('filedata'), async (req,res) => {
  let path = `/images/${req.file.filename}`
  let animal = await Animal.findOne({_id:req.params.id})
  animal.img.push(path)
  await animal.save()
  res.redirect(`/animal/${req.params.id}`)
})
router.put('/:id/content', adminChecker, async (req,res) => {
  const {content} = req.body
  console.log(content, req.params.id);
  await Animal.findOneAndUpdate({_id:req.params.id},{info:content} )
  res.json('Обновлено')
} )
router.put('/:id', adminChecker, async (req,res) => {
  const {name} = req.body
  await Animal.findOneAndUpdate({_id:req.params.id},{name:name} )
  res.json('Обновлено')
})

module.exports = router;
