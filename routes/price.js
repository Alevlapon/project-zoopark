const express = require('express');
const router = express.Router();
const {adminChecker} = require('../midllewares/auth')
const mongoose = require("mongoose")
const Tarif = require("../models/price")

router.get('/', adminChecker,async (req, res) => {
  let tarifes
  try {
    tarifes = await Tarif.find();
    const lastTarif = tarifes[tarifes.length - 1]
    res.render('price', {lastTarif} );
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    });
  }
});

router.put('/', adminChecker, async (req, res) => {
  const {big2,big5,child2,child5} = req.body
  const newTarifes = new Tarif({
    big2,
    big5,
    child2,
    child5
  })
  try {
    await newTarifes.save();
  } catch (error) {
    res.render('error', {
      message: 'Не удалось добавить запись в базу данных.',
      error: {}
    });
  }
  res.json(newTarifes);
});




module.exports = router;
