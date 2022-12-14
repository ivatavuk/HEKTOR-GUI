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
    }]
});

module.exports = mongoose.model('Robot', robotScheema);