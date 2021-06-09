const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose: connection established.');
  });

  mongoose.connection.on('error', () => {
    console.log('Mongoose: connection error.');
  });
};
