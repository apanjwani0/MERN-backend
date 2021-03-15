const express = require('express');
const route = express.Router();

const checkJWT = require('../../core/middleware/check-jwt');
const eventController = require('../controller/eventController');

route.get('/viewAllEvents', eventController.displayAll);

route.get('/viewAllUsersEvents', checkJWT, eventController.display);

route.post('/add', checkJWT, eventController.add);

route.delete('/delete/:eventID', checkJWT, eventController.delete);

route.patch('/update/:eventID', checkJWT, eventController.update);

module.exports = route;