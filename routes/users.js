'use strict';

const User = require('../models/usersModel');

const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    UsersModel = require('../models/usersModel');

router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: "Album Review | Signup",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/signup',
        }
    })
})

router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: "Album Review | Log In",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: "partials/login"
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const response = await UsersModel.addUser(
        first_name, 
        last_name, 
        email, 
        hash
    );
    console.log("Registration Response :", response);
    if (response.id) {
        res.redirect('/users/login')
    } else {
        res.send("Error, please try resubmitting").status(500);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = new UsersModel(null, null, null, email, password);
    const response = await user.login();

    if (!!response.isValid) {
        // do stuff if a user is logged in
        req.session.is_logged_in = response.isValid;
        req.session.user_id = response.user_id;
        req.session.first_name = response.first_name;
        req.session.last_name = response.last_name;
        res.redirect('/');
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;