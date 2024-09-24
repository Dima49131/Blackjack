const express = require('express');
const router = express.Router();
const User = require('../User'); // Import the User Schema
const passport = require('passport');


router.get('/outsidePacman', (req, res) => {
    res.render('outsidePacman.ejs');
});

router.get('/outsideTetris', (req, res) => {
    res.render('outsideTetris.ejs');
});

router.get('/outsideBrickBreaker', (req, res) => {
             res.render('outsideBrickBreaker.ejs');
});



module.exports = router;