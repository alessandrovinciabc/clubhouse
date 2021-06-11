let router = require('express').Router();
let controller = require('../controllers/messageController');

router.post('/new', controller.POSTNew);

module.exports = router;
