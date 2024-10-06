const express = require('express');
const router = express.Router();
const User = require('../User');
const passport = require('passport');

// Serve the homepage regardless of authentication state
router.get('/homepage', (req, res) => {
    const userID = req.user ? req.user._id.toString() : null;
    
    // Render the homepage with user details if logged in
    res.render('homepage.ejs', {
        id: userID,  // Pass null if not logged in
        name: req.user ? req.user.name : null,  // Pass null if not logged in
        tokenBalance: req.user ? req.user.tokens : null // Pass null if not logged in
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/homepage', // Redirect to homepage on successful login
    failureRedirect: '/homepage',     // Redirect to login page on failure
    failureFlash: true             // Optional: use flash messages for feedback
}));


module.exports = router;
