
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../User'); // Import the User Schema
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render('login.ejs', {messages: req.flash()}); // Ensure 'login.ejs' exists in the 'views' directory
});

router.get('/', (req, res) => {
    res.render('login.ejs', {messages: req.flash()}); 
});


router.get('/register',(req, res) => {
    const error = req.query.error;
    res.render('register.ejs', { error });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/login',
    failureFlash: true
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
        res.redirect('/login');

    } catch (error){
        console.error('Error registering user:', error); // Log the error
        res.redirect('/register?error=account_exists');
    }
});

router.delete('/logout', async (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});
module.exports = router;
