var express = require('express');
var b2cController = require('../controller/b2c.controller');
var router = express.Router();

router.post('/b2c', b2cController.b2c);

module.exports = router;