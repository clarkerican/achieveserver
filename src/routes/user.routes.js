const express = require('express');

import * as userController from './../controllers/user.controller';

// Routes go here

export const router = express.Router();

/**
 * GET friends of user with userId
 */
router.get('/friends/:userId', userController.getFriends);


/**
 * POST new friendship
 *
 * Order of the ids does not matter
 * Ex:
 * {
 *  "id1": 1,
 *  "id2": 2
 * }
 */
router.post('/friends', userController.addFriends);

/**
 * GET user by username
 */
router.get('/:username', userController.getUser);

/**
 * POST a new user
 *
 * Ex:
 * "user": {
 *  "username": "enc",
 *  "email": "email@gmail.com",
 *  "firstName": "Eric",
 *  "lastName": "Clark"
 * }
 */
router.post('/', userController.createUser);

export function setDependencies(userService, friendshipService) {
  userController.setDependencies(userService, friendshipService);
}