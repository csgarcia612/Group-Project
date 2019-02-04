const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    massive = require('massive'),
    app = express(),
    authController = require('./controller/Auth0_controller')
    doteenv = require('dotenv');
    dotenv.config();

    app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set(db);
}).catch(error => console.log(("error in massive", error)))

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 * 2}
}));

app.get('/auth/callback', authController.login);
app.get('/auth/user-data', authController.getUser);
app.post('/auth/logout', authController.logout);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    
})