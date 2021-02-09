'use strict';

const host = "ziggy.db.elephantsql.com",
    database = "lutdygpu",
    user = "lutdygpu",
    password = "DPUNvQZ4s-T5swst4pVWfRr1XFHH6t8a";

const pgp = require('pg-promise')({
    query: function (event) {
        console.log('QUERY: ', event.query)
    }
});

const options = {
    host, 
    database,
    user,
    password
}

const db = pgp(options);

module.exports = db;