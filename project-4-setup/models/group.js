const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  theme: { type: String, required: true },
  destination: { type: String, required: true },
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{
    status: { type: String, default: 'pending' },
    member: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }],
  comments: [{
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    content: { type: String }
  }, {
    timestamps: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);
