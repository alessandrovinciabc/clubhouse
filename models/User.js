const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 50 },
  lastName: { type: String, required: true, maxLength: 50 },
  username: { type: String, required: true, unique: true, maxLength: 20 },
  passwordHash: { type: String, required: true },
  membership: {
    type: String,
    enum: ['none', 'member', 'admin'],
    default: 'none',
  },
});

module.exports = mongoose.model('User', UserSchema);
