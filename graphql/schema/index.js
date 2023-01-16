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
    videoFeedList: [VideoFeed!]
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

type VideoFeed{
    _id: ID!
    topicName: String!
    windowName: String!
    robotId: String!
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

input VideoFeedInput{
    topicName: String!
    windowName: String!
    robotId: String!
}

type RootQuery{
    robots: [Robot!]!
    topics(robotId:String!): [Topic!]!
    videoFeeds(robotId:String!): [VideoFeed!]!
    login(email:String!, password:String!): AuthData!
}

type RootMutation{
    createUser(user_input: UserInput): User
    createRobot(robot_input: RobotInput): Robot
    deleteRobot(robot_id: ID!): Robot!
    createTopic(topic_input: TopicInput): Topic
    deleteTopic(topic_id: ID!): Topic!
    createVideoFeed(video_feed: VideoFeedInput): VideoFeed
    deleteVideoFeed(video_feed_id: ID!): VideoFeed!
}

schema{
    query: RootQuery
    mutation: RootMutation
}

`);