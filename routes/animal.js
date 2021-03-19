const express = require('express');
const { route } = require('.');
const router = express.Router();
const Animal = require('../models/animal');
const {adminChecker,AdminCheckRedir} = require('../midllewares/auth')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, cb) {
    cb(null, path.join(Date.now() + '-' + file.originalname.replace(/\.jpg/, '')))
  }
})
const fileFilter = (req, file, cb) => {
  
  if(file.mimetype === "image/png" || 
  file.mimetype === "image/jpg"|| 
  file.mimetype === "image/jpeg"){
      cb(null, true);
  }
  else{
      cb(null, false);
  }
}
const upload = multer({ storage:storage, fileFilter:fileFilter })


router.get('/',adminChecker, async (req, res) => {
  let animals = await Animal.find()
  res.render('animal', { animals });
});
router.get('/new', adminChecker,AdminCheckRedir,(req, res) => {
  res.render('new')
})
router.post('/',adminChecker, upload.single('filedata'), async (req,res) => {
  const {name, info} = req.body
  console.log(req.file);
  if (req.file) {
    let path = `/images/${req.file.filename}`
    await Animal.create({
      name,
      info,
      img: [path],
      frontImg: path
    })
    res.redirect("/animal")
  } else {
    res.send('GG')
  }
})
router.get('/:id', adminChecker, async (req,res) => {
  let animal = await Animal.findOne({_id:req.params.id})
  res.locals.animalPictures = animal.img
  res.locals.animalContent = animal.info
  res.locals.animalName = animal.name
  res.locals.animalId = animal._id
  res.locals.images = animal.img
  res.render('oneanimal')
})
router.post('/:id', adminChecker,upload.single('filedata'), async (req,res) => {
  if (req.file) {
  let path = `/images/${req.file.filename}`
  let animal = await Animal.findOne({ _id: req.params.id })
  animal.img.push(path)
  await animal.save()
  res.redirect(`/animal/${req.params.id}`)
  } else {
    let animal = await Animal.findOne({_id:req.params.id})
    res.locals.animalPictures = animal.img
    res.locals.animalContent = animal.info
    res.locals.animalName = animal.name
    res.locals.animalId = animal._id
    res.locals.uploadErr = 'Неверный формат файла'
    res.render('oneanimal')
  }
})
router.put('/:id/content', adminChecker, async (req,res) => {
  const {content} = req.body
  await Animal.findOneAndUpdate({_id:req.params.id},{info:content} )
  res.json('Обновлено')
} )
router.put('/:id', adminChecker, async (req,res) => {
  const {name} = req.body
  await Animal.findOneAndUpdate({_id:req.params.id},{name:name} )
  res.json('Обновлено')
})
router.delete('/:id', adminChecker, async (req,res) => {
  try {
    const {id,path} = req.body
  let choosenAnimal = await Animal.findOne({_id:id})
  let deletImg = choosenAnimal.img.findIndex((el) => el === path)
  choosenAnimal.img.splice(deletImg,1)
  await Animal.findByIdAndUpdate({_id:id}, {img:choosenAnimal.img})
  res.json('Success')
  } catch (error) {
    res.json(error.message)
  }
  
})

module.exports = router;
