const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    _subcategories: [{type: Schema.Types.ObjectId, ref: 'SubCategories', required: false}]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

CategorySchema.virtual('id').get(() => this._id );
CategorySchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: '_category',
  justOne: false
});
CategorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: '_category',
  justOne: false
});



CategorySchema.virtual('subCategories', {
  ref: 'SubCategory',
  localField: '_id',
  foreignField: '_category',
  justOne: false
});

module.exports = mongoose.model('Category', CategorySchema);