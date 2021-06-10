let router = require('express').Router();
let controller = require('../controllers/authController');

router.get('/login', controller.GETLogin);

router.route('/signup').get(controller.GETSignup).post(controller.POSTSignup);

module.exports = router;
