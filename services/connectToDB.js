const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.mongoDB, error => {
  if (!error) {
    console.log('Success');
  } else {
    console.log('Error connecting to Database!');
  }
});

module.exports = {
  conn
};
