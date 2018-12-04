const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentarioSchema = new Schema(
  {
    text: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    proveedor: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  {
    timestamps: {
      updatedAt: "update_at",
      createdAt: "created_at"
    }
  }
);

module.exports = mongoose.model("Comentario", comentarioSchema);
