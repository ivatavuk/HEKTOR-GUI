const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataStreamScheema = new Schema({
    topicName:{
        type:String,
        required: true
    },
    windowName:{
        type:String,
        required: true
    },
    robotId:{
        type:String,
        required: true
    },
    isPointCloud:{
        type: Boolean,
        required:true
    }
});

module.exports = mongoose.model('DataStream', dataStreamScheema);