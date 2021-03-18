function cookieMiddleware(app) {
  const express = require('express')
  const cookieParser = require('cookie-parser')
  const session = require('express-session')
  const FileStore = require('session-file-store')(session)
  const mongoose = require("mongoose");

  app.use(cookieParser())
  app.use(
    session({
      store: new FileStore(),
      key: "user_sid",
      secret: "Animals",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 6000000
      }
    })
  )

  function cookiesCleaner(req, res, next) {
    if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie("user_sid");
    }
    next();
  }
  app.use(cookiesCleaner)
}

const sessionChecker = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/animals");
  } else {
    next();
  }
};

const adminChecker = (req, res, next) => {
  if (!req.session.user) {
    next()
  } else {
    res.locals.isAdmin = true
    next();
  }
};
module.exports = {
  sessionChecker,
  cookieMiddleware,
  adminChecker
};
