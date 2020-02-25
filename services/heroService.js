
class HeroService {
  constructor(conn, idleActionService) {
    this.conn = conn;
    this.idleActionService = idleActionService;
  }

  heroExistsCheck(hero) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM heroes INNER JOIN users ON heroes.userId = users.id WHERE users.id = ? AND heroes.name = ?;';
      this.conn.query(query, [hero.userId, hero.name], (err, row) => {
        err ? reject(err) : resolve(row.length);
      });
    });
  }

  heroExists(heroId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM heroes WHERE id = ?;';
      this.conn.query(query, [heroId], (err, row) => {
        err ? reject(err) : resolve(row.length);
      });
    });
  }

}

module.exports = HeroService;
