class HeroController {
  constructor(heroService, getIdFromToken) {
    this.heroService = heroService;
    // this.getHeroes = this.getHeroes.bind(this);
    // this.postHero = this.postHero.bind(this);
    this.getHeroByName = this.getHeroByName.bind(this);
    this.getIdFromToken = getIdFromToken;
  }

  // getHeroes(req, res) {
  //   this.heroService.getHeroes(this.getIdFromToken(req))
  //     .then(data => res.status(200).json(data))
  //     .catch(error => res.status(500).json(error));
  // }

  // postHero(req, res) {
  //   const heroInput = {
  //     userId: Number(this.getIdFromToken(req)),
  //     name: req.body.name,
  //   };
  //   if (req.body.smallImage) heroInput.smallImage = req.body.smallImage;
  //   if (req.body.bigImage) heroInput.smallImage = req.body.bigImage;
  //   if (heroInput.userId && heroInput.name) {
  //     const hero = new Hero(heroInput);
  //     this.heroService.addHero(hero)
  //       .then(response => res.status(200).json(response))
  //       .catch(error => res.status(500).json(error.message));
  //   } else {
  //     res.status(400).json({ error: 'Please provide a username and a userId' });
  //   }
  // }

  getHeroByName(req, res) {
    const heroName = req.params.heroName;
    if (heroName) {
      this.heroService.retrieveHeroByName(heroName).then(
        (response) => {
          res.status(200).json(response);
        },
        (error) => {
          res.status(400).json({ Error: error.message });
        });
    } else {
      res.status(400).json({ Error: 'Please provide a Hero name' });
    }
  }
}

module.exports = HeroController;
