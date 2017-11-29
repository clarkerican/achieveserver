const express = require('express');

import * as postController from './../controllers/post.controller'

const router = express.Router();

// Routes go here

module.exports = router;


/* POST a new post */
router.post('/create', postController.createPost);

/* GET all posts of this user's friends */
router.get('/feed/:userid', postController.getUsersFeed);

/* POST a comment on a post */
router.post('/comment/:postid', postController.createComment);

/* GET all comments for a post */
router.get('/comment/:postid', postController.getPostsComments);

/* POST a like on the post */
router.post('/like/:postid', postController.likePost);

/* GET post by id */
router.get('/:postid', postController.getPost);

export function setDependencies(newPostService) {
  postController.setDependencies(newPostService);
}