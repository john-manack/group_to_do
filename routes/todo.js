'use strict';

const express = require('express'),
    router = express.Router(),
    toDoModel = require('../models/toDoModel');

router.get('/', async (req, res) => {
    const albumListData = await albumModel.getTaskByID();
    console.log("Album List: ", albumListData);
    res.render('template', {
        locals: {
            title: "Album Review | List",
            albumListData,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: "partials/album-list",
        }
    });
});

module.exports = router;