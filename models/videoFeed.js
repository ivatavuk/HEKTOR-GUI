const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoFeedScheema = new Schema({
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
    }
});

module.exports = mongoose.model('VideoFeed', videoFeedScheema);