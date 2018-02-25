'use strict';

const db = require("../lib/db").createDatabaseClient();

module.exports.getBooks = (event, context, callback) => {
  db.all(process.env.STATE_BOOKS_TABLE, 
    res => callback(null, JSON.stringify(res)),
    err => callback(err)
  );
};


module.exports.countAuthors = (event, context, callback) => {
  db.all(process.env.STATE_COUNT_AUTHORS_TABLE, 
    res => callback(null, JSON.stringify(res)),
    err => callback(err)
  );
};
