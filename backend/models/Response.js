const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  queryId: { type: Schema.Types.ObjectId, ref: 'Query', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  resourceUrl: { type: String, required: true },
  resourceType: { type: String, enum: ['pdf', 'image'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', ResponseSchema);
