const mongoose = require('mongoose');

let heroSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: 'Required'
  },
  name: {
    type: String,
    required: 'Required'
  }
});

mongoose.model('hero', heroSchema)