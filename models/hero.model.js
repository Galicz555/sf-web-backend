const mongoose = require('mongoose');

let heroSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: 'Required'
  },
  charname: {
    type: String,
    required: 'Required'
  },
  sfSociety: {
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
  },
  race: {
    type: String,
    required: 'Required'
  },
  gender: {
    type: String,
    required: 'Required'
  },
  theme: {
    type: String,
    required: 'Required'
  },
  homeWorld: {
    type: String,
    required: 'Required'
  },
  aligment: {
    type: String,
    required: 'Required'
  },
  diety: {
    type: String,
    required: 'Required'
  },
  player: {
    type: String,
    required: 'Required'
  },
  speed: {
    type: Number,
    required: 'Required'
  }
});

mongoose.model('heroes', heroSchema)