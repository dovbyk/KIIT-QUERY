const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "DSA"
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);

