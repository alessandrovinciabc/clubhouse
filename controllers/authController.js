const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

let authController = {};

authController.GETLogin = (req, res) => {
  res.render('loginView');
};

authController.POSTLogin = [
  body('username')
    .notEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('Not a string.'),
  body('password')
    .notEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('Not a string.'),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }

    let user = await User.findOne({
      username: req.body.username,
    });

    if (user == null)
      return res.status(400).json('Invalid username or password.');

    let passwordMatches = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );
    if (!passwordMatches)
      return res.status(400).json('Invalid username or password.');

    res.json(user);
  },
];

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
  (req, res) => {
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
      }).then((user) => res.json(user));
    });
  },
];

module.exports = authController;
