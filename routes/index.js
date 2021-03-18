var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const Animal = require('../models/animal');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, cb) {
    cb(null, path.join(Date.now() + '-' + file.originalname.replace(/\.jpg/, '')))
  }
})
const upload = multer({ storage:storage })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router  
  .route('/upload')
  .get((req,res) => {
  res.render('upload')
  })
  .post(upload.single('filedata'), async (req,res) => {
    let path = `/images/${req.file.filename}`
    let a = await Animal.findOne()
    a.img.push(`/images/${req.file.filename}`)
    await a.save()
    res.render('upload', {path});
  })

module.exports = router;
