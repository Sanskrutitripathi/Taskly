const express = require('express');
const controller = require('./controller');
const router = express.Router();
console.log("in route.js")

router.post('/signup', controller.signup);
router.post('/login', controller.login);
// router.patch('/resetpassword', controller.resetPassword);


module.exports = router;
