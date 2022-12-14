const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topicScheema = new Schema({
    robotId:{
        type:String,
        required: true
    },
    topicName:{
        type:String,
        required: true
    },
    topicType:{
        type:String,
        required: true
    },
    topicLable:{
        type:String,
        required: true
    },
    topicValue:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Topic', topicScheema);