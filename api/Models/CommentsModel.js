const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    postId: {
        type: String 
    }, 
    userId: {
        type: String
    },
    content: {
        type: String
    }, 
    likes: {
        type: Array, 
        default: []
    }, 
    numberOfLikes: {
        type: Number, 
        default: 0
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', schema);

module.exports = {Comment};