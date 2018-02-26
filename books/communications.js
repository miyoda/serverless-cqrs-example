'use strict';

const { compose, dissoc, pick } = require("ramda");
const db = require("./lib/db")();

const parseEvent = message => {
  const messagePayload = message.Records[0].Sns.Message;
  return compose(dissoc("default"), JSON.parse)(messagePayload);
};

module.exports.saveEventCreateBook = (message, context, callback) => {
  console.log("saveEventCreateBook "+JSON.stringify(message));
  const event = parseEvent(message);

  if (event.type !== "create-book") return;

  db.save(process.env.EVENTS_BOOKS_TABLE, event,
    entry => callback(null, entry),
    error => callback(error));
};

module.exports.saveStateBook = (message, context, callback) => {
  console.log("saveStateBook "+JSON.stringify(message));
  const event = parseEvent(message);

  if (event.type !== "create-book") return;

  let book = event.payload;

  db.save(process.env.STATE_BOOKS_TABLE, book, 
    entry => callback(null, entry), 
    error => callback(error));
};

module.exports.saveStateCountAuthor = (message, context, callback) => {
  console.log("saveStateBook "+JSON.stringify(message));
  const event = parseEvent(message);

  if (event.type !== "create-book") return;

  let author = event.payload.author;
  console.log("saveSetateCountAuthor increase author " + author);
  db.update(process.env.STATE_COUNT_AUTHORS_TABLE, author,
    "set totalCount = totalCount + :incr",
    {":incr": 1},
    entry => callback(entry),
    error => {
      console.log("Error: "+JSON.stringify(error));
      console.log("saveSetateCountAuthor not found " + author);
      let countAuthor = {
        id: author,
        totalCount: 1
      }
      db.save(process.env.STATE_COUNT_AUTHORS_TABLE, countAuthor, 
        entry => callback(null, entry), 
        error => callback(error)
      );
    }
  );
  
  const save = (countAuthor) => {
    
  };
};