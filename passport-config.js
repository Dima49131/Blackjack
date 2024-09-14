const { authenticate } = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('./User'); // Import the User model


function initialize(passport, getUserByEmail){
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email });
        if (user == null){return done(null, false, {message: 'No user found with that email.'});}

        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else {
                return done(null, false, {message: "Incorrect Password"});
            }
        } catch (e){
            return done(e);

        }; 
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => {done(null, user._id);});
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user); // If user is found, pass it to `done`
        } catch (error) {
            done(error); // If there's an error, pass it to `done`
        }
    });
}

module.exports = initialize;