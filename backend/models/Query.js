const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const responseSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resourceUrl: String,
  resourceType: { type: String, enum: ["image", "pdf"] },
  createdAt: { type: Date, default: Date.now },});

const querySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageUrl: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  responses: [responseSchema],
  comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model("Query", querySchema);
