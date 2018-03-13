const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, max: 128 },
    synopsis: { type: String, required: true, max: 256 },
    body: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    published_at: { type: Date, required: false }
  }
);

module.exports = mongoose.model('Post', PostSchema);