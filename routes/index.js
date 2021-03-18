var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

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
  .post(upload.single('filedata'),(req,res) => {
    let path = `/images/${req.file.filename}`
    console.log(req.file);
    res.render('upload', {path});
  })

module.exports = router;
