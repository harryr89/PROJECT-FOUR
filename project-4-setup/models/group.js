const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: { type: String, required: true },
  theme: { type: String, required: true },
  destination: { type: String, required: true },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Group', groupSchema);
