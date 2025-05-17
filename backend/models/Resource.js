const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherResourceSchema = new Schema({
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['pdf'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeacherResource', TeacherResourceSchema);
