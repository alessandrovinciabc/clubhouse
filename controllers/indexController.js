let indexController = {};

const Message = require('../models/Message');

indexController.GETRoot = async (req, res) => {
  let newMessages;

  try {
    newMessages = await Message.find({}).populate('owner');
  } catch (err) {
    res.status(500).json({ err: 'Unexpected error.' });
  }

  res.locals.messages = newMessages;
  res.render('indexView');
};

module.exports = indexController;
