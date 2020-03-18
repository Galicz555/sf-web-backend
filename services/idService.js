const mongoose = require('mongoose');
const UserModel = mongoose.model('users');
class idService {

  constructor() {
    this.retrieveUserById = this.retrieveUserById.bind(this);
  }

  retrieveUserById(username) {
    return new Promise((resolve, reject) => {
      // const query = 'SELECT * FROM users WHERE username = ?;';
      UserModel.find({ username: username }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          resolve(docs[0]._id);
        }
      });
    });
  }
}
module.exports = idService;
