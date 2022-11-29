const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User{
    _id: ID!
    email: String!
    password: String
    createdRobots: [Robot!]
}

type Robot{
    _id: ID!
    name: String
    IPv4: String!
    user: User!
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input UserInput{
    email: String!
    password: String
}

input RobotInput{
    name: String!
    IPv4: String!
}

type RootQuery{
    robots: [Robot!]!
    login(email:String!, password:String!): AuthData!
}

type RootMutation{
    createUser(user_input: UserInput): User
    createRobot(robot_input: RobotInput): Robot
    deleteRobot(robot_id: ID!): Robot!
}

schema{
    query: RootQuery
    mutation: RootMutation
}

`);