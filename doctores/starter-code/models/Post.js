const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const postSchema = new Schema({
     content: String,
     creatorId: {
         type: Schema.Types.ObjectId, 
         ref: 'User'
        },
        postedID: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }
 });

 module.exports = mongoose.model('Post', postSchema);