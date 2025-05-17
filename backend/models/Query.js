const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuerySchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  imageUrl: { type: String },
  type: { type: String, enum: ['query', 'resource'], default: 'query' },
  fileUrl: { type: String }
});

module.exports = mongoose.model('Query', QuerySchema);
