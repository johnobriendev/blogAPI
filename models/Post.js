const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, },
  content: { type: String, required: true, },
  author: { type: Schema.Types.ObjectId, ref: 'User',  required: true, },
  published: { type: Boolean, default: false, },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);