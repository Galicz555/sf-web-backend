const mongoose = require('mongoose');
const hero = mongoose.model('heroes');
class HeroService {
  constructor(conn, idleActionService) {
    this.conn = conn;
    this.idleActionService = idleActionService;
  }

  // heroExistsCheck(hero) {
  //   return new Promise((resolve, reject) => {
  //     const query =
  //       'SELECT * FROM heroes INNER JOIN users ON heroes.userId = users.id WHERE users.id = ? AND heroes.name = ?;';
  //     this.conn.query(query, [hero.userId, hero.name], (err, row) => {
  //       err ? reject(err) : resolve(row.length);
  //     });
  //   });
  // }

  // heroExists(heroId) {
  //   return new Promise((resolve, reject) => {
  //     const query = 'SELECT * FROM heroes WHERE id = ?;';
  //     this.conn.query(query, [heroId], (err, row) => {
  //       err ? reject(err) : resolve(row.length);
  //     });
  //   });
  // }

  retrieveHeroByName(heroName) {
    return new Promise((resolve, reject) => {
      // const query = 'SELECT * FROM users WHERE username = ?;';
      hero.find({ charname: heroName }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          resolve(docs);
        }
      });
    });
    // const query = 'SELECT * FROM heroes WHERE id = ?; SELECT name, id, type, active FROM equipment WHERE heroId = ?; SELECT equipmentId, attributeName, value FROM equipment JOIN equipmentAttributes ON equipment.id = equipmentAttributes.equipmentId JOIN attributeModifier ON attributeModifier.id = equipmentAttributes.attributeId WHERE heroId = ?; SELECT * FROM idleStatus WHERE heroId = ?;';
    //eslint-disable-line
    // this.conn.query(query, [heroId, heroId, heroId, heroId], (err, rows) => {
    // if (err) {
    //   reject(err);
    // } else {
    // const equipment = rows[1];
    // const modifiers = rows[2];
    // const hero = rows[0][0];
    // const inventory = [];
    // const idleAction = rows[3][0];

    // equipment.forEach((element) => {
    //   const sortedModifiers = modifiers.filter(e => e.equipmentId === element.id);
    //   const activeState = Boolean(Number(element.active));
    //   const equipmentItem = new Equipment(element.id, element.name, sortedModifiers, element.type, activeState);
    //   inventory.push(equipmentItem);
    // });
    // hero.inventory = inventory;
    // const resHero = new Hero(hero);

    // if (idleAction) {
    //   delete rows[3][0].heroId;
    //   resHero.idleAction = idleAction;
    // }
    // resolve(resHero);
  }
}
module.exports = HeroService;
