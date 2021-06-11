let router = require('express').Router();
let controller = require('../controllers/messageController');

router.post('/new', controller.POSTNew);

router.post('/m/:messageid/delete', controller.POSTDelete);

module.exports = router;
