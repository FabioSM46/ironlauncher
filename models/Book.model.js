const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    author: { type: String },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Book", bookSchema);
