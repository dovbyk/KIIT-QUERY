const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  communities: [{ type: Schema.Types.ObjectId, ref: 'Community' }],
  responseCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);
