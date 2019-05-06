var express = require('express');
var router = express.Router();
router.use('/users', require('../APIs/controllers/users.controller'));
module.exports = router;