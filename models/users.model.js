const mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Required'
  },
  email: {
    type: String,
    required: 'Required'
  },
  password: {
    type: String,
    required: 'Required'
  },
  phoneNumber:{
    type: String,
    required: 'Required'
  },
  dateOfBirth:{
    type: String,
    required: 'Required'
  },
  role: {
    type: String,
    required: 'Required'
  }
});

mongoose.model('users', usersSchema)