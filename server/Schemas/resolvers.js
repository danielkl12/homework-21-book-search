const {User, Book} = require('../models');
const {loginToken} = require('../utils/auth');
const {Error} = require('apollo-server-express');

const resolvers = {
    
 Query: {
     user: async(parent, args, context) => {
         if(context.user) {
             const userData = await User.findOne({_id: context.user._id})
             .select('-__v -password')

             return userData;
         }

         throw new Error('Please log in');


     }
 },



Mutation: {
    login: async (parent, {email, password}) => {
        const user= await User.findOne({email});

        if(!user) {
            throw new Error('User not found');
        }

        const passwordCorrect = await user.isCorrect({password});

        if(!passwordCorrect) {
            throw new Error('Incorrect Password');
        }
        const token = loginToken(user);
        return{token, user};
    },


    saveBookInfo: async(parent, {input},context) =>{

        if (context.user) {
            
        }


    },

    newUser: async(parent, args) => {
        const user = await User.create(args);
        const token = loginToken(user);

        return{token, user}
    },

    



}




}

module.exports = resolvers;
