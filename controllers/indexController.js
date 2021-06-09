let indexController = {};

indexController.GETRoot = (req, res) => {
  res.render('indexView');
};

module.exports = indexController;
