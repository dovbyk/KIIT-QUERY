const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    subjectId: {
      type: String,
      required: true,
    },
    communityId: {
      type: String,
      required: true,
    },
    resourceUrl: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["pdf", "image", "video", "doc"],
      required: true,
    },
    uploadedBy: {
      type: String, // refers to teacher _id
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resource", resourceSchema);

