const express = require('express');
const router = express.Router();

// Routes go here

module.exports = router;

/* GET post by id */
router.get('/post/:postid', (req, res)=> {res.sendStatus(200);});

/* POST a new post */
router.post('/post', (req, res)=> {res.sendStatus(200);});

/* GET all posts of this user's friends */
router.get('/posts/:userid', (req, res)=> {res.sendStatus(200);});

/* POST a comment on a post */
router.post('/post/:postid/comment', (req, res)=> {res.sendStatus(200);});

/* GET all comments for a post */
router.get('/post/:postid/comment', (req, res)=> {res.sendStatus(200);});

/* POST a like on the post */
router.post('/post/:postid/like', (req, res)=> {res.sendStatus(200);});