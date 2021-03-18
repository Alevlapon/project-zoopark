var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Admin = require('../models/admin');
const createError = require('http-errors');

/* GET users listing. */
router.get('/admin', function (req, res, next) {
  res.render('admin');
});

router.post("/admin", async function (req, res, next) {
  const { name, password } = req.body
  const admin = await Admin.findOne({ login: name })
  if (admin && admin.password == password) {
    req.session.user = admin
    // alert("Вы вошли в режим управления зоопарком")
    res.redirect("/animal")
  } else {
    res.redirect('/')
  }
});

router.get('/logout', (req,res) => {
    if (req.session.user) {
      try {
        await req.session.destroy();
        res.clearCookie("user_sid");
        res.redirect("/");
      } catch (error) {
        next(error);
      }
  }});


module.exports = router;
