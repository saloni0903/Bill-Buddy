const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  cycle: {
    type: String,
    required: true,
    enum: ['Monthly', 'Yearly']
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Paused']
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
