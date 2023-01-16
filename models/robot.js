const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const robotScheema = new Schema({
    name:{
        type:String,
        required: true
    },
    IPv4:{
        type:String,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    topicList:[{
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    videoFeedList:[{
        type: Schema.Types.ObjectId,
        ref: 'VideoFeed'
    }]
});

module.exports = mongoose.model('Robot', robotScheema);