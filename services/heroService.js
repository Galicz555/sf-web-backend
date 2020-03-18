const mongoose = require('mongoose');
const hero = mongoose.model('heroes');
class HeroService {
  constructor(conn, idleActionService) {
    this.conn = conn;
    this.idleActionService = idleActionService;
  }

  retrieveHeroById(heroId) {
    return new Promise((resolve, reject) => {
      hero.find({ id: heroId }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  updateHeroById(char) {
    return new Promise((resolve, reject) => {
      hero.findOne({ id: char.id }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          if (char.charname) {
            docs.charname = char.charname;
          }
          if (char.sfSociety) {
            docs.sfSociety = char.sfSociety;
          }
          if (char.level) {
            docs.level = char.level;
          }
          if (char.race) {
            docs.race = char.race;
          }
          if (char.theme) {
            docs.theme = char.theme;
          }
          docs.save((err, updatedObject) => {
            if (err) {
              console.log(err);
            } else {
              resolve(updatedObject);
            }
          });
        }
      });
    });
  }
}
module.exports = HeroService;
