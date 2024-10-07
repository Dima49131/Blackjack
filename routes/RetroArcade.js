const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../User'); // Import the User Schema
const passport = require('passport');

// Serve the homepage regardless of authentication state
router.get('/homepage', (req, res) => {
    const userID = req.user ? req.user._id.toString() : null;
    const messages = req.flash('error'); // Capture flash messages

    // Render the homepage with user details if logged in
    res.render('homepage.ejs', {
        id: userID,  // Pass null if not logged in
        name: req.user ? req.user.name : null,  // Pass null if not logged in
        tokenBalance: req.user ? req.user.tokens : null, // Pass null if not logged in
        messages
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/homepage', // Redirect to homepage on successful login
    failureRedirect: '/homepage?loginFailed=true',     // Redirect to login page on failure
    failureFlash: true             // Optional: use flash messages for feedback
}));


router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const tokenValue = 50;

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            tokens: tokenValue
        });
        
        await newUser.save(); // saves to --> mongo DB
        res.redirect('/homepage');

    } catch (error){
        console.error('Error registering user:', error); // Log the error
        res.redirect('/register?error=account_exists');
    }
});

router.delete('/logout', async (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/homepage');
    });
});

module.exports = router;
