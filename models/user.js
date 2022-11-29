const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Kako ce izgledat polja u bazi
const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdRobots: [{
        type: Schema.Types.ObjectId,
        ref: 'Robot'
    }]
});

module.exports = mongoose.model('User',userSchema);