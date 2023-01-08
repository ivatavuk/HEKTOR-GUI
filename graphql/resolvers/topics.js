const Topic = require('../../models/topic');
const Robot = require('../../models/robot')

module.exports ={
    createTopic: async(args) =>{
        try{
        const topic = new Topic({
            topicName: args.topic_input.topicName,
            topicType: args.topic_input.topicType,
            topicLable: args.topic_input.topicLable,
            topicValue: args.topic_input.topicValue,
            robotId: args.topic_input.robotId,
            isGraphData: args.topic_input.isGraphData
        })
        let createdTopic;
        try{
            const result = await topic.save();

            if(!result){
                throw new Error("Didn't save");
            }
            createdTopic = {
                ...result._doc,
                _id: result._doc._id
            };

            const robot = await Robot.findById(args.topic_input.robotId);

            if(!robot){
                throw new Error("Can't find robot");
            }

            robot.topicList.push(topic);
            await robot.save();
            return createdTopic;
        }catch(err){
            throw err;
        }
        }catch(err){
            throw err;
        }
    },
    topics: async(args) =>{
        try{
            const topics = await Topic.find();
            return topics.map(topic =>{
                return {
                    ...topic._doc,
                    _id: topic.id
                };
            });
        }catch(err){
            throw err;
        }
    },
    deleteTopic: async(args)=>{
        try{
            const topic = await Topic.findById(args.topic_id);

            await Robot.updateOne({_id: topic.robotId}, {$pull: {topicList : { $in: args.topic_id}}});

            await Topic.deleteOne({_id: args.topic_id});
            
            return topic;
        }catch(err){
            throw err;
        }
    }
};