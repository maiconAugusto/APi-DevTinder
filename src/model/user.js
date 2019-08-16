const { Schema, model} = require('mongoose');

const CreateUser = new Schema({
    name:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    avatar:{
        type: String,
        required: true
    },
    likes:[{
        type : Schema.Types.ObjectId,
        ref: 'User'
    }],
    deslike:[{
        type : Schema.Types.ObjectId,
        ref: 'User'
    }],

},{
    timestamps: true
})

module.exports = model('User',CreateUser)