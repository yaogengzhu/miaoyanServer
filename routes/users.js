var express = require('express');
var router = express.Router();
var api = require('../api/index');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('are you ok?');
});

// 这里创建路由
router.post('/login', api.login);
router.post('/register', api.register);
router.post('/verify', api.verify);
router.post('/checkEmail', api.checkEmail)


module.exports = router;
