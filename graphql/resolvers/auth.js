const bcrypt = require('bcryptjs')
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports =  {
    createUser : async args => {
        try{
        //pronadi ako postoji vec email u bazi
        const findUser = await User.findOne({email: args.user_input.email});
        if(findUser){
            //if user exists throw error
            throw new Error('User already exists.');
        }
        //if user doesn't exist hash the password
        const hashedPassword = await bcrypt.hash( args.user_input.password,12)
        
        const user = new User({
            email: args.user_input.email,
            password: hashedPassword
        });
        const userResultSave = await user.save();

        return {...userResultSave._doc, password: null, _id: userResultSave.id}; //overvrajtas pass tako da ga ne mozes vratit iz baze (iako je hashan moze bit issue)
        }catch(err){
            throw err;
        }
    },
    login: async ({email, password}) =>{
        const user = await User.findOne({email: email});
        //check if user exists
        if(!user){
            throw new Error('User does not exist');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        //check if password is correct
        if(!isEqual){
            throw new Error('Password incorrect');
        }
        //create web token
        const token = jwt.sign({userId: user.id,email: user.email}, 'somesupersecretkey',{
            expiresIn:'1h'
        });

        //return object that matches type of AuthData
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        };
    }
}