const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "Author" }, //<--- or we can import mongoose const { mongoose, Schema, model } = require("mongoose") and use mongoose.Schema.ObjectId
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Book", bookSchema);
