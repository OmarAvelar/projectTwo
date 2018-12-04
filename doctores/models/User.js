const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    email: String,
    experience: String,
    photoURL: String,
    type: {
      type: String,
      enum: ["usuario", "proveedor"],
      default: "proveedor"
    },
    location: {
      type: {
        type: String,
        default: "Point"
      },
      address: String,
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
 
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    versionKey: false 
  }
);


const User = mongoose.model('User', userSchema);
module.exports = User;