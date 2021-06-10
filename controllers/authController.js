const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const passport = require('passport');

let authController = {};

authController.GETLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};

authController.GETLogin = (req, res) => {
  res.render('loginView');
};

authController.POSTLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});

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
    .withMessage('Must have <= 100 characters.')
    .custom((value, { req }) => value === req.body.confirmpassword)
    .withMessage('Passwords do not match.'),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }

    bcrypt.hash(req.body.password, SALT_ROUNDS, function (err, hash) {
      if (err) return res.status(500).json(err);
      User.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        username: req.body.username,
        passwordHash: hash,
      }).then((user) => {
        req.login(user, (err) => {
          if (err) return next(err);
          res.redirect('/');
        });
      });
    });
  },
];

module.exports = authController;
