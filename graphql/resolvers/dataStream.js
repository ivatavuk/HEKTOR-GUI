const Robot = require('../../models/robot');
const DataStream = require('../../models/dataStream');

module.exports ={
    createDataStream: async(args) =>{
        try{
        const dataStream = new DataStream({
            topicName: args.data_stream.topicName,
            windowName: args.data_stream.windowName,
            robotId: args.data_stream.robotId,
            isPointCloud: args.data_stream.isPointCloud
        })
        let createdDataStream;
        try{
            const result = await dataStream.save();

            if(!result){
                throw new Error("Didn't save");
            }
            createdDataStream = {
                ...result._doc,
                _id: result._doc._id
            };
            //push created data stream to dataStreamList
            const robot = await Robot.findById(args.data_stream.robotId);
            if(!robot){
                throw new Error("Can't find robot");
            }
            
            robot.dataStreamList.push(dataStream);
            await robot.save();

            return createdDataStream;
        }catch(err){
            throw err;
        }
        }catch(err){
            throw err;
        }
    },
    dataStreams: async(args) =>{
        try{
            const dataStreams = await DataStream.find({robotId: args.robotId});
            return dataStreams.map(data =>{
                return {
                    ...data._doc,
                    _id: data.id
                };
            });
        }catch(err){
            throw err;
        }
    },
    deleteDataStream: async(args) =>{
        try{
            const dataStream = await DataStream.findById(args.data_stream_id);
            //update DataStreamList in Robot
            await Robot.updateOne({_id: dataStream.robotId}, {$pull: {dataStreamList : { $in: args.data_stream_id}}});

            await DataStream.deleteOne({_id: args.data_stream_id});

            return dataStream;
        }catch(err){
            throw(err);
        }
    }
};