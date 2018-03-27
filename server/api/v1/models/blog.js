const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, max: 128 },
    synopsis: { type: String, required: true, max: 256 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    published_at: { type: Date, required: false },
<<<<<<< HEAD
    _category: { type: Schema.Types.ObjectId, ref: 'Category', required: false}
=======
    _category: { type: Schema.Types.ObjectId, ref: 'Category', required: false},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post', required: false }]
>>>>>>> 541cfb16561867bf9c3ce8043232a7ee9fd37e19
  }
);

BlogSchema.virtual('id').get(() => this._id );

module.exports = mongoose.model('Blog', BlogSchema);