require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const discordStrategy = require('./strategies/discordstrat');
const db = require('./database/database');

db.then(() => console.log('Connected to MongoDB database')).catch(err => console.log(err));

// Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

app.use(session({
    secret: 'random-secrets',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: 'discord.oauth2'
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

app.get('/', (req, res) => { 
    res.render('home', {
        users: [
            { name: 'TheGabDooSan', email: 'thegab@doo.san' },
            { name: 'Nobody', email: 'no@bo.dy' }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Now listening to requests on port ${PORT}`);
});
