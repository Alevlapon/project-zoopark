const express = require('express');
const router = express.Router();
const {adminChecker} = require('../midllewares/auth')


/* GET home page. */
router.get('/',adminChecker, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;



