'use strict';

const express = require('express'),
    router = express.Router(),
    toDoModel = require('../models/toDoModel');

router.get('/', (req, res) => {
    res.render('template', {
        locals: {
            title: "To-do | Home",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: "partials/home"
        }
    });
});

module.exports = router;