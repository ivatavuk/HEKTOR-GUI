const Robot = require('../../models/robot');
const user = require('../../models/user');
const User = require('../../models/user');
const {transformRobot} = require('./merge');

module.exports ={
    robots: async(args, req) =>{
        try{
            const robots = await Robot.find({user: req.userId});
            return robots.map(robot =>{
                return transformRobot(robot);
            });

        }catch(err){
            throw err;
        }
    },
    createRobot: async(args, req) =>{
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }
        try{
        const robot = new Robot({
            name: args.robot_input.name,
            IPv4: args.robot_input.IPv4,
            user: req.userId
        });
        let createdRobot;
        try{
            const result = await robot.save();
            createdRobot = transformRobot(result);
            const user = await User.findById(req.userId);

            if(!user){
                throw new Error("Can't find user");
            }
            user.createdRobots.push(robot);
            await user.save();
            return createdRobot;
        }catch(err){
            throw err;
        }
        }catch(err){
            throw err;
        }
    },
    deleteRobot: async (args, req) =>{
        // if(!req.isAuth){
        //     throw new Error("Unauthenticated");
        // }
        try{
            const robot = await Robot.findById(args.robot_id).populate('user');
            const user = await User.findById(robot.user._doc._id);
            
            await User.updateOne({_id: robot.user._doc._id}, {$pull: {createdRobots : { $in: args.robot_id}}});
            
            await Robot.deleteOne({_id: args.robot_id});
            return robot;
        }catch(err){
            throw err;
        }
    }
};