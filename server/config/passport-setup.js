const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // For generating random password

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback', // Use environment variable for flexibility
            proxy: true // Important if your app is behind a proxy (e.g., Heroku, Nginx)
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists in your DB
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // User found, log them in
                    return done(null, user);
                } else {
                    // If not, create a new user in your DB
                    const randomPassword = crypto.randomBytes(20).toString('hex');
                    const hashedPassword = await bcrypt.hash(randomPassword, 12);

                    const newUser = new User({
                        googleId: profile.id,
                        email: profile.emails && profile.emails[0] ? profile.emails[0].value : null, // Make sure email exists
                        firstName: profile.name && profile.name.givenName ? profile.name.givenName : 'User',
                        lastName: profile.name && profile.name.familyName ? profile.name.familyName : '',
                        profilePicUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
                        password: hashedPassword, // Store a hashed random password for Google users
                        authProvider: 'google',
                        // contactNumber will be optional as per model
                    });

                    // Validate email (as it's unique and required in your model)
                    if (!newUser.email) {
                        return done(new Error("Could not retrieve email from Google profile."), null);
                    }
                    
                    // Check if email already exists for a local account
                    const existingEmailUser = await User.findOne({ email: newUser.email });
                    if (existingEmailUser) {
                        // Optional: Link Google ID to existing local account or return error
                        // For now, let's return an error to avoid conflicts if email is taken by local auth
                        return done(new Error("This email is already registered. Please log in with your local account or use a different Google account."), null);
                    }

                    await newUser.save();
                    return done(null, newUser);
                }
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// These are typically used with sessions. For JWT, the user object from `done`
// will be available in req.user in the callback route.
passport.serializeUser((user, done) => {
    done(null, user.id); // user.id is the MongoDB _id
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});