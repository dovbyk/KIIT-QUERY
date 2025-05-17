const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  name : {type : String, required: true},
  description: {type: String},
  subjects: [{type: Schema.Types.ObjectId, ref: 'Subject'}]
});

module.exports = mongoose.model('Community', CommunitySchema);