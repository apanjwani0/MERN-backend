var express = require('express');

var route = express.Router();

var userController = require('../controllers/accountController');
var checkJWT = require('../../core/middleware/check-jwt');

route.post('/signup', userController.signup);

route.post('/login', userController.login);

route.get('/profile', checkJWT, userController.profile);

route.patch('/profile', checkJWT, userController.profileUpdate);

route.post('/delete', checkJWT, userController.profileDelete); 

route.post('/logout',checkJWT,userController.logout)

module.exports = route;