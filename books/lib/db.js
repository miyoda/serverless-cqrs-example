const AWS = require("aws-sdk");
const IS_OFFLINE = eval(process.env.IS_OFFLINE);
const REGION = process.env.SERVERLESS_REGION

AWS.config.update({ region: REGION });

const createDynamoDbConnection = () =>
  IS_OFFLINE ?
    new AWS.DynamoDB.DocumentClient({ endpoint: "http://localhost:8000" }) :
    new AWS.DynamoDB.DocumentClient();

const dynamoDb = createDynamoDbConnection();

const createDatabaseClient = () => ({
  find: (TableName, id, success, failure) => {
    dynamoDb.get({ TableName, Key: { id } }, (error, result) =>
      (error || !result || !result.Item) ? failure(error) : success(result.Item)
    );
  },

  all: (TableName, success, failure) => {
    dynamoDb.scan({ TableName }, (error, result) =>
      (error || !result || !result.Items) ? failure(error) : success(result.Items)
    );
  },

  save: (TableName, Item, success, failure) => {
    dynamoDb.put({ TableName, Item }, (error) =>
      error ? failure(error) : success(Item)
    );
  },

  update: (TableName, id, UpdateExpression, ExpressionAttributeValues, success, failure) => {
    dynamoDb.update({
      TableName,
      Key: { id } ,
      UpdateExpression,
      ExpressionAttributeValues,
      ReturnValues:"UPDATED_NEW"
    }, (error, result) =>
      (error || !result) ? failure(error) : success(result.Items)
    );
  }

});

module.exports = createDatabaseClient;