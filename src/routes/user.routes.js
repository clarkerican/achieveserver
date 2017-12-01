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
 *  "username": "enclark" // TODO
 * }
 */
router.post('/friends', userController.addFriends);

/**
 * Post user or get user if it already exists
 */
router.post('/login', userController.getUserByUsername);

/**
 * GET user by userId
 */
router.get('/:userId', userController.getUser);



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