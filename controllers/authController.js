const { body, validationResult } = require('express-validator');
const User = require('../models/User');

let authController = {};

authController.GETLogin = (req, res) => {
  res.render('loginView');
};

authController.GETSignup = (req, res) => {
  res.render('signupView');
};

authController.POSTSignup = [
  body('firstname')
    .notEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('Not a string.')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Must have <= 50 characters.'),
  body('lastname')
    .notEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('Not a string.')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Must have <= 50 characters.'),
  body('username')
    .notEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('Not a string.')
    .isLength({ max: 20 })
    .withMessage('Must have <= 20 characters.'),
  body('password')
    .notEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('Not a string.')
    .isLength({ max: 100 })
    .withMessage('Must have <= 100 characters.'),
  (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }

    User.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      username: req.body.username,
      passwordHash: req.body.password,
    }).then((user) => res.json(user));
  },
];

module.exports = authController;
