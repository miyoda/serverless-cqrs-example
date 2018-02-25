

const db = require("../lib/db").createDatabaseClient();

const success = entry => callback(null, entry);
const failure = error => callback(error, {});

const parseEvent = message => {
  const messagePayload = message.Records[0].Sns.Message;
  return compose(dissoc("default"), JSON.parse)(messagePayload);
};

module.exports.saveEventCreateBook = (event, context, callback) => {
  const event = parseEvent(message);

  if (event.type !== "create-book") return;

  db.save(process.env.EVENTS_BOOKS_TABLE, order, success, failure);
};

module.exports.saveStateBook = (event, context, callback) => {
  const event = parseEvent(message);

  if (event.type !== "create-book") return;

  let book = event.payload;

  db.save(process.env.STATE_BOOKS_TABLE, book, success, failure);
};

module.exports.saveSetateCountAuthor = (event, context, callback) => {
  const event = parseEvent(message);

  if (event.type !== "create-book") return;

  let countAuthor = {
    author: event.payeload.author,
    count: 1
  }
  //TODO sum

  db.save(process.env.STATE_COUNT_AUTHORS_TABLE, countAuthor, success, failure);
};