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
    name: String!
    IPv4: String!
    user: User!
    topicList: [Topic!]
}

type Topic{
    _id: ID!
    robotId: String!
    topicName: String!
    topicType: String!
    topicLable: String!
    topicValue: String!
    isGraphData: Boolean!
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

input TopicInput{
    robotId: String!
    topicName: String!
    topicType: String!
    topicLable: String!
    topicValue: String!
    isGraphData: Boolean!
}

type RootQuery{
    robots: [Robot!]!
    topics: [Topic!]!
    login(email:String!, password:String!): AuthData!
}

type RootMutation{
    createUser(user_input: UserInput): User
    createRobot(robot_input: RobotInput): Robot
    deleteRobot(robot_id: ID!): Robot!
    createTopic(topic_input: TopicInput): Topic
    deleteTopic(topic_id: ID!): Topic!
}

schema{
    query: RootQuery
    mutation: RootMutation
}

`);