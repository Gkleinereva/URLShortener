var express = require('express');
var router = express.Router();

var cont = require('../controllers/controller');

/* GET home page. */
router.get('/', cont.GoHome);

router.get('/add/*', cont.AddURL);

router.get('/:urlID', cont.GoToURL);

module.exports = router;
