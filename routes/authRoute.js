let router = require('express').Router();
let controller = require('../controllers/authController');

router.get('/login', controller.GETLogin);
router.get('/signup', controller.GETSignup);

module.exports = router;
