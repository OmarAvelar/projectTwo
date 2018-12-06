// const mongoose = require('mongoose');
//  const Schema = mongoose.Schema;

//  const postSchema = new Schema({
//      content: String,
//      creatorId: {
//          type: Schema.Types.ObjectId, 
//          ref: 'User'
//         },
//         postedID: {
//             type: Schema.Types.ObjectId, 
//             ref: 'User'
//         }
//  },
//  {
//     timestamps: {
//       createdAt: "created_at",
//       updatedAt: "updated_at"
//     }
//   }
//  );

//  module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const postSchema = new Schema({
     content: String,
     creatorId: {
         type: Schema.Types.ObjectId, 
         ref: 'User'
        },
     picpath: String,
     picname: String
 });

 module.exports = mongoose.model('Post', postSchema);