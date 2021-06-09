let authController = {};

authController.GETLogin = (req, res) => {
  res.render('loginView');
};

authController.GETSignup = (req, res) => {
  res.render('signupView');
};

module.exports = authController;
