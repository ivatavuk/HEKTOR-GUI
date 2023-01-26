const User = require('../../models/user');
const Robot = require('../../models/robot');
const Topic = require('../../models/topic');
const DataStream = require('../../models/dataStream');

const robots = async robotID =>{
    try{
        const robots = await Robot.find({_id:{$in:robotID}});
        return robots.map(robot =>{
            return transformRobot(robot);
        });
    }catch(err){
        throw err;
    }
}

const user = async userID =>{
    try{
    const user = await User.findById(userID);
        return{
            ...user._doc,
            _id: user.id,
            createdRobots: robots.bind(this, user._doc.createdRobots)
        };
    }catch(err){
        throw err;
    }    
};

const topics = async topicID =>{
    try{
    const topics = await Topic.find({_id:{$in:topicID}});
        return topics.map((topic)=>{
            return {
                ...topic._doc,
                _id: topic.id
            };
        });
    }catch(err){
        throw err;
    }    
};

const dataStreams = async dataStreamID =>{
    try{
    const dataStream = await DataStream.find({_id:{$in:dataStreamID}});
        return dataStream.map((data)=>{
            return {
                ...data._doc,
                _id: data.id
            };
        });
    }catch(err){
        throw err;
    }    
};

const transformRobot = (robot) =>{
    return {
        ...robot._doc,
        _id: robot.id,
        user: user.bind(this, robot.user),
        topicList: topics.bind(this, robot._doc.topicList),
        dataStreamList: dataStreams.bind(this, robot._doc.dataStreamList)
    };
}


exports.transformRobot = transformRobot;
