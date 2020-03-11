const mongoose = require('mongoose');
const UserModel = mongoose.model('users');
class idService {
  constructor(getIdFromToken) {
    this.getIdFromToken = getIdFromToken;
  }
  retrieveUserById() {
    return new Promise((resolve, reject) => {
      // const query = 'SELECT * FROM users WHERE username = ?;';
      UserModel.find({ _id: this.getIdFromToken }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          resolve(docs);
        }
      });
    });
  }
}
module.exports = idService;
