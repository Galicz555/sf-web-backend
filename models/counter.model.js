const mongoose = require('mongoose');

let counterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: 'Required'
  },
  sequence_value: {
    type: Number,
  }
});

mongoose.model('counters', counterSchema)