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
          if (char.gender) {
            docs.gender = char.gender;
          }
          if (char.theme) {
            docs.theme = char.theme;
          }
          if (char.homeWorld) {
            docs.homeWorld = char.homeWorld;
          }
          if (char.aligment) {
            docs.aligment = char.aligment;
          }
          if (char.diety) {
            docs.diety = char.diety;
          }
          if (char.player) {
            docs.player = char.player;
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
