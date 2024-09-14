const express = require('express');
const router = express.Router();
const User = require('../User'); // Import the User Schema
const passport = require('passport');


router.get('/homepage', (req, res) => {
    const userID = (req.user ? req.user._id.toString() : null);
    if (userID) {
            res.render('homepage.ejs', {
                 id: userID, 
                 name: req.user.name,
                 tokenBalance: req.user.tokens

                });
    } else {
        res.redirect('/login');
    }
});

router.get('/pacman', (req, res) => {
    const userID = (req.user ? req.user._id.toString() : null);
    if (userID) {
            res.render('pacman.ejs', {
                 id: userID, 
                 name: req.user.name,
                 tokenBalance: req.user.tokens

                });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
