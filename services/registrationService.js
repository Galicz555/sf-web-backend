const mongoose = require('mongoose');
const UserModel = mongoose.model('users');

class RegistrationService {
  constructor(conn) {
    this.conn = conn;
  }

  checkIfUserNameNumLatinLetters(input) {
    // eslint-disable-line
    const user = /^[A-Za-z0-9]\w{0,}$/;

    if (input && user.test(input)) {
      return true;
    }
    return false;
  }

  checkIfPasswordNumLatinLetter(input) {
    // eslint-disable-line
    const passw = /^[A-Za-z0-9]\w{7,}$/;

    if (input && passw.test(input)) {
      return true;
    }
    return false;
  }

  containsUser(item) {
    return new Promise(resolve => {
      // const query = 'SELECT * FROM users WHERE username = ?;';
      UserModel.find({ username: item.username }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  insertUser(item) {
    return new Promise((resolve, reject) => {
      let newUser = new UserModel({
        username : item.username,
        email : item.email,
        password : item.password,
        // confirmPsw : item.confirmPsw,
        phoneNumber : item.phoneNumber,
        dateOfBirth : item.dateOfBirth,
        role : 'user'
      });

      newUser.save()
      // .then(result => {console.log(result)}).catch(err => console.log(err));
      resolve(newUser.id)
      // const query = 'INSERT INTO users (username, password) VALUES (?, ?);';

      // this.conn.query(query, [item.username, item.password], (err, row) => {
      //   err ? reject(err) : resolve(row.insertId);
      // });
    });
  }

  async createUser(item) {
    const userData = await this.containsUser(item);
    return new Promise((resolve, reject) => {
      if (
        !this.checkIfUserNameNumLatinLetters(item.username) ||
        !this.checkIfPasswordNumLatinLetter(item.password)
      ) {
        reject(new Error(400));
      } else if (!userData.length) {
        resolve(this.insertUser(item));
      } else {
        reject(new Error(500));
      }
    }).then((data) => {console.log(data)},
    (reject) => {console.log(reject)});
  }
}

module.exports = RegistrationService;
