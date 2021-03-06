const mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type: String,
    required: false,
  },
  dateOfBirth:{
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  }
});

mongoose.model('users', usersSchema)