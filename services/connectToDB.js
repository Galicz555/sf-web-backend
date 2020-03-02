// const mongoose = require('mongoose');

// const conn = mongoose.connect(process.env.mongoDB, error => {
//   if (!error) {
//     console.log('Success');
//   } else {
//     console.log('Error connecting to Database!');
//   }
// });

// module.exports = {
//   conn
// };

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = 'sf-backend';
const url = process.env.mongoDB;
const mongoOption = { useNewUrlParser: true };

const state = {
  db: null
};

const connect = cb => {
  if (state.db) {
    cb();
  } else {
    MongoClient.connect(url, mongoOption, (err, client) => {
      if (err) {
        cb(err);
      } else {
        state.db = client.db(dbname);
      cb();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
}

const getDB = () => {
  return state.db;
}

const conn = connect(error => {
  if (!error) {
    console.log('Success');
    console.log(connect)
  } else {
    console.log('Error connecting to Database!');
  }
});


module.export = {conn, getDB, getPrimaryKey}
