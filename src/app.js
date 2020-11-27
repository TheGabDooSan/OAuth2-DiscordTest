require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');

const discordStrategy = require('./strategies/discordstrat');
const db = require('./database/database');

db.then(() => console.log('Connected to MongoDB database')).catch(err => console.log(err));

// Routes
const authRoute = require('./routes/auth')

app.use(session({
    secret: 'random-secrets',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Now listening to requests on port ${PORT}`)
});
