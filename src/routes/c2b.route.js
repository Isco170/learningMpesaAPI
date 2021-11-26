var express = require('express');
var c2bController = require('../controller/c2b.controller');
var router = express.Router();

router.post('/c2b', c2bController.c2b);

module.exports = router;