let router = require('express').Router();
let controller = require('../controllers/authController');

router.route('/login').get(controller.GETLogin).post(controller.POSTLogin);

router.get('/logout', controller.GETLogout);

router.route('/signup').get(controller.GETSignup).post(controller.POSTSignup);

module.exports = router;
