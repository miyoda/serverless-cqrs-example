'use strict';

const uuid = require('uuid');
const bus = require("./lib/bus")();

module.exports.createBook = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.title !== 'string' || typeof data.author !== 'string') {
    callback('Validation error');
    return;
  }

  let generatedId = uuid.v1();
  const createBookEvent = {
    type: 'create-book',
    timestamp: new Date().getTime(),
    id: generatedId,
    payload: {
      id: generatedId,
      title: data.title,
      author: data.author
    }
  };
  
  bus.publish(createBookEvent,
    msg => {
      callback(null, {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createBookEvent.payload)
      })
    },
    err => {
      callback(null, {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"error": err})
      })
    }
  );
};