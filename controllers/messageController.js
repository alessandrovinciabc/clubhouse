const { body, validationResult } = require('express-validator');

let messageController = {};

const Message = require('../models/Message');

messageController.POSTNew = [
  (req, res, next) => {
    if (!req.user) return res.redirect('/');

    next();
  },
  body('title')
    .notEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('Not a string.')
    .trim()
    .isLength({ max: 60 })
    .withMessage('Must have <= 60 characters.'),
  body('message')
    .notEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('Not a string.')
    .trim()
    .isLength({ max: 280 })
    .withMessage('Must have <= 280 characters.'),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }

    let newMessage = {
      title: req.body.title,
      message: req.body.message,
      owner: req.user._id,
    };

    Message.create(newMessage)
      .then((value) => {
        res.redirect('/');
      })
      .catch((err) => res.status(500).json({ err }));
  },
];

module.exports = messageController;
