const Robot = require('../../models/robot');
const VideoFeed = require('../../models/videoFeed');

module.exports ={
    createVideoFeed: async(args) =>{
        try{
        const videoFeed = new VideoFeed({
            topicName: args.video_feed.topicName,
            windowName: args.video_feed.windowName,
            robotId: args.video_feed.robotId
        })
        let createdVideoFeed;
        try{
            const result = await videoFeed.save();

            if(!result){
                throw new Error("Didn't save");
            }
            createdVideoFeed = {
                ...result._doc,
                _id: result._doc._id
            };
            //push created video feed to videoFeedList
            const robot = await Robot.findById(args.video_feed.robotId);
            if(!robot){
                throw new Error("Can't find robot");
            }
            
            robot.videoFeedList.push(videoFeed);
            await robot.save();

            return createdVideoFeed;
        }catch(err){
            throw err;
        }
        }catch(err){
            throw err;
        }
    },
    videoFeeds: async(args) =>{
        try{
            const videoFeeds = await VideoFeed.find({robotId: args.robotId});
            return videoFeeds.map(data =>{
                return {
                    ...data._doc,
                    _id: data.id
                };
            });
        }catch(err){
            throw err;
        }
    },
    deleteVideoFeed: async(args) =>{
        try{
            const videoFeed = await VideoFeed.findById(args.video_feed_id);
            //update VideoFeedList in Robot
            await Robot.updateOne({_id: videoFeed.robotId}, {$pull: {videoFeedList : { $in: args.video_feed_id}}});

            await VideoFeed.deleteOne({_id: args.video_feed_id});

            return videoFeed;
        }catch(err){
            throw(err);
        }
    }
};