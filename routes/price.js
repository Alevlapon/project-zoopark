const express = require('express');
const router = express.Router();
const {adminChecker} = require('../midllewares/auth')

router.get('/', adminChecker, (req, res) => {
  res.render('price');
});


module.exports = router;
