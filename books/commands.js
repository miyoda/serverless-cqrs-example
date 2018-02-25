'use strict';

const uuid = require('uuid');
const bus = require("../lib/bus").createEventBusClient();

module.exports.createBook = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.title !== 'string' || typeof data.author !== 'string') {
    callbackError(400, 'Validation error', callback);
    return;
  }

  let generatedId = uuid.v1();
  const event = {
    type: 'create-book',
    timestamp: new Date().getTime(),
    id: generatedId,
    payload: {
      id: generatedId,
      title: data.title,
      author: data.author
    }
  };
  
  bus.publish(event,
    msg => {
      callback(null, {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event.payload),
      })
    },
    err => {
      callback(null, {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"error": err}),
      })
    }
  );
};