const authResolver = require('./auth');
const robotResolver = require('./robots');

//Dodajes ostale resolvere
const rootResolver = {
    ...authResolver,
    ...robotResolver
};

module.exports = rootResolver;

