const authResolver = require('./auth');
const robotResolver = require('./robots');
const topicResolver = require('./topics')

//Dodajes ostale resolvere
const rootResolver = {
    ...authResolver,
    ...robotResolver,
    ...topicResolver
};

module.exports = rootResolver;

