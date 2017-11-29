const express = require('express');
const router = express.Router();

// Routes go here

module.exports = router;

router.post('/:username', (req, res)=> {res.sendStatus(200);});

router.get('/:username', (req, res)=> {res.sendStatus(200);});

router.get('/:username/friends', (req, res)=> {res.sendStatus(200);});

router.post('/:username/friends', (req, res)=> {res.sendStatus(200);});