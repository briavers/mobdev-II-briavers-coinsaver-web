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
    published_at: { type: Date, required: false },
    _category: { type: Schema.Types.ObjectId, ref: 'Category', required: false}
  }
);

PostSchema.virtual('id').get(() => this._id );

module.exports = mongoose.model('Post', PostSchema);