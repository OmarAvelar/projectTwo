
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    fecha: Date,
    hora: Number,
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
}
);

module.exports = mongoose.model('Post', postSchema);