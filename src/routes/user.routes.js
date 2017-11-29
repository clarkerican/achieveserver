const express = require('express');

import * as userController from './../controllers/user.controller';

const router = express.Router();

// Routes go here

module.exports = router;

router.get('/friends/userId', userController.getFriends);

router.post('/friends', userController.addFriends);

router.get('/:username', userController.getUser);

router.post('/', userController.createUser);

export function setDependencies(userService, friendshipService) {
  userController.setDependencies(userService, friendshipService);
}