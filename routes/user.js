var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

module.exports = router;
