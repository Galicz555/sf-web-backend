class idController {
  constructor(idService, getIdFromToken) {
    this.idService = idService;
    this.getIdFromToken = getIdFromToken;
    this.getUserName = this.getUserName.bind(this);
  }

  // getHeroes(req, res) {
  //   this.heroService.getHeroes(this.getIdFromToken(req))
  //     .then(data => res.status(200).json(data))
  //     .catch(error => res.status(500).json(error));
  // }

  getUserName(req, res) {
    this.idService.retrieveUserById(this.getIdFromToken(req)).then(
      response => {
        res.status(200).json(response);
      },
      error => {
        res.status(400).json({ Error: error.message });
      }
    );
  }
}

module.exports = idController;
