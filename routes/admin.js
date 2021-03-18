var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Admin = require('../models/admin');

/* GET users listing. */
router.get('/admin', function (req, res, next) {
  res.render('admin');
});

router.post("/admin", async function (req, res, next) {
  const { name, password } = req.body
  const admin = await Admin.findOne({ login: name })
  if (admin && admin.password == password) {
    res.redirect('/')
  } else {
    res.redirect('/')
  }
});

module.exports = router;
