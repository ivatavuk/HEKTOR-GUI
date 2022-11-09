const authResolver = require('./auth');

//Dodajes ostale resolvere
const rootResolver = {
    ...authResolver
};

module.exports = rootResolver;

