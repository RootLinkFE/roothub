const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
const LOG_DATA = 'LOG_DATA';

module.exports = {
    Subscription: {
        logData: {
            subscribe: () => {
                return pubsub.asyncIterator([LOG_DATA]);
            }
        }
    }
}