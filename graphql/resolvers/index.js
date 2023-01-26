const authResolver = require('./auth');
const robotResolver = require('./robots');
const topicResolver = require('./topics');
const dataStreamResolver = require('./dataStream');

//Dodajes ostale resolvere
const rootResolver = {
    ...authResolver,
    ...robotResolver,
    ...topicResolver,
    ...dataStreamResolver
};

module.exports = rootResolver;

