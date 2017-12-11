const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  theme: { type: String, required: true },
  destination: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{
    status: { type: String, default: 'pending' },
    member: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }],
  // status: { type: String, default: 'pending' },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Group', groupSchema);
