const authResolver = require('./auth');
const robotResolver = require('./robots');
const topicResolver = require('./topics');
const videoFeedResolver = require('./videoFeed');

//Dodajes ostale resolvere
const rootResolver = {
    ...authResolver,
    ...robotResolver,
    ...topicResolver,
    ...videoFeedResolver
};

module.exports = rootResolver;

