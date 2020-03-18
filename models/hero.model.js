const mongoose = require('mongoose');

let heroSchema = new mongoose.Schema({
  charname: {
    type: String,
    required: 'Required'
  },
  class: {
    type: String,
    required: 'Required'
  },
  level: {
    type: Number,
    required: 'Required'
  }
});

mongoose.model('heroes', heroSchema)