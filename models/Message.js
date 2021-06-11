const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const MessageSchema = new Schema(
  {
    owner: { required: true, type: ObjectId, ref: 'User' },
    title: { type: String, maxLength: 60, required: true },
    message: { type: String, maxLength: 280, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
