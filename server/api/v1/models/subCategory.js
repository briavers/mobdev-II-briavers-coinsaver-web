const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    _category: { type: Schema.Types.ObjectId, ref: 'Category', required: false}
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

SubCategorySchema.virtual('id').get(() => this._id );

SubCategorySchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'SubCategories'
});
SubCategorySchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: '_subCategory'
});



module.exports = mongoose.model('SubCategory', SubCategorySchema);