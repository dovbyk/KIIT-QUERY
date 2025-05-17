const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  name: { type: String, required: true },
  communityId: { type: Schema.Types.ObjectId, ref: 'Community', required: true }
});

module.exports = mongoose.model('Subject', SubjectSchema);
