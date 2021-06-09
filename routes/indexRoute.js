let router = require('express').Router();
let indexController = require('../controllers/indexController');

router.get('/', indexController.GETRoot);

module.exports = router;
