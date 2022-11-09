const express = require('express');
const bodyParser = require('body-parser');
const  { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middelware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization');

    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

//AUTH
app.use(isAuth);

app.use('/graphql',graphqlHTTP({
    schema:graphQLSchema ,
    rootValue:graphQLResolvers,
    graphiql:true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ef54xcz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).
then(()=>{
    app.listen(8000);
}).catch(err => {console.log(err);});