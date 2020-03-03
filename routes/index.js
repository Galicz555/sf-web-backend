const express = require('express');

const router = express.Router();
const { conn } = require('../services/connectToDB');

const helloWorldController = require('../controllers/hello-world');
const HeroController = require('../controllers/heroController');
const HeroService = require('../services/heroService');
const RegistrationController = require('../controllers/registrationController');
const RegistrationService = require('../services/registrationService');
const LoginController = require('../controllers/loginController');
const LoginService = require('../services/loginService');
const Authentication = require('../services/authenticationService');

let useddb = conn;
let accTokSec = process.env.ACCESS_TOKEN_SECRET;
let refTokSec = process.env.REFRESH_TOKEN_SECRET;

const auth = new Authentication(accTokSec, refTokSec);
const registrationService = new RegistrationService(useddb);
const registrationController = new RegistrationController(registrationService);
const loginService = new LoginService(useddb, registrationService, auth.generateAccessToken, auth.generateRefreshToken);
const loginController = new LoginController(loginService);
const heroService = new HeroService(useddb);
const heroController = new HeroController(heroService, Authentication.getIdFromToken);

router.get('/helloworld', helloWorldController.helloWorldController);

router.post('/login', loginController.login);

router.get('/hero/:heroName',
//  auth.authenticateToken,
  heroController.getHeroByName); //eslint-disable-line

router.get('/heroes', auth.authenticateToken,
// heroController.getHeroes
);

router.post('/register', registrationController.register);

router.post('/getToken', auth.RefreshedToken);


module.exports = router;
