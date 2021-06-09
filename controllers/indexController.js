let indexController = require('express').Router();

indexController.GETRoot = (req, res) => {
  res.render('indexView');
};

module.exports = indexController;
