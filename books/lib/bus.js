const { compose, assoc } = require("ramda");
const AWS = require("aws-sdk");
const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const OFFLINE_AWS_ACCOUNT_ID = "123456789012";
const IS_OFFLINE = eval(process.env.IS_OFFLINE);
const REGION = process.env.SERVERLESS_REGION;

const createSnsConnection = () =>
  IS_OFFLINE ?
    new AWS.SNS({ endpoint: "http://127.0.0.1:4002", region: REGION }) :
    new AWS.SNS();

const sns = createSnsConnection();

const buildTopicArn = (topicName) => {
  const accountId = IS_OFFLINE ? OFFLINE_AWS_ACCOUNT_ID : AWS_ACCOUNT_ID;
  return `arn:aws:sns:${REGION}:${accountId}:${topicName}`;
};

const createEventBusClient = () => {
  return {
    publish: (event, success, failure) => {
      let message = compose(JSON.stringify, assoc("default", "json"))(event);
      sns.publish({
        Message: message,
        TopicArn: buildTopicArn(event.type)
      }, error =>
        error ? failure(error) : success(message)
      );
    }
  };
};

module.exports = createEventBusClient;