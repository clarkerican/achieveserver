const express = require('express');

import * as postController from './../controllers/post.controller'

export const router = express.Router();


/**
 *  POST a new post
 *
 *  Body Ex:
 *  {
 *    "post": {
 *      "title": "title",
 *      "content": "content"
 *    }
 *    "author": 1
 *  }
 */
router.post('/create', postController.createPost);

/**
 *  GET all posts of this user's friends, and this user
 *
 *  Will return the posts with the most recent posts first
 */
router.get('/feed/:userid', postController.getUsersFeed);

/**
 *  POST a comment on a post
 *
 * Body Ex:
 *{
 *  {
 *    "comment": {
 *      "content": "Great Post!"
 *     },
 *    "author": 1
 *  }
 */
router.post('/comment/:postid', postController.createComment);

/**
 *  GET all comments for a post
 */
router.get('/comment/:postid', postController.getPostsComments);

/**
 *  POST a like on the post
 */
router.post('/like/:postid', postController.likePost);

/**
 * GET post by id
 *
 * Also returns the comments of a post. Res will look like
 * {
 *   post: {
 *      // content
 *   },
 *   comments: [
 *     // comments
 *   ]
 * }
 */
router.get('/:postid', postController.getPost);

export function setDependencies(newPostService, newFriendshipService) {
  postController.setDependencies(newPostService, newFriendshipService);
}