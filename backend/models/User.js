const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  { 
    _id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      description: "Roll as primary key",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    communities: {
      type: [String],
      default: [],
    },
    responseCount: {
      type: Number,
      default: 0,
    },
    queryCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("isTeacher").get(function () {
  return this.role === "teacher";
});

userSchema.virtual("isStudent").get(function () {
  return this.role === "student";
});

const User = mongoose.model("User", userSchema);
module.exports = User;

