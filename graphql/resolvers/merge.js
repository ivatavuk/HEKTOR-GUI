const User = require('../../models/user');
const Robot = require('../../models/robot');

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

const transformRobot = (robot) =>{
    return {
        ...robot._doc,
        _id: robot.id,
        user: user.bind(this, robot.user)
    };
}


exports.transformRobot = transformRobot;
