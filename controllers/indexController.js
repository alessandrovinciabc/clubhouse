let indexController = require('express').Router();

indexController.GETRoot = (req, res) => {
  res.render('indexView');
};

exports.index = indexController;
