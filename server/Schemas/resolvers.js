const {User, Book} = require('../models');
const {loginToken} = require('../utils/auth');
const {Error} = require('apollo-server-express');

const resolvers = {
    
 Query: {
     user: async()
 }

}


