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
    }
});

module.exports = mongoose.model('User',userSchema);