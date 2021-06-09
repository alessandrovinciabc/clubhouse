let router = require('express').Router();
let indexController = require('../controllers/indexController').index;

router.get('/', indexController.GETRoot);

module.exports = router;
