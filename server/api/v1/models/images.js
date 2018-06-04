const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema(
  {
    title: { type: String, required: true, max: 128 },
    imgLink: { type: File, required: false},
    imgSize: { type: Number, required: false, default: 125 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

ImagesSchema.virtual('id').get(() => this._id);
PostSchema.virtual('types', {
  ref: 'Type',
  localField: '_id',
  foreignField: 'images'
});

module.exports = mongoose.model('Images', ImagesSchema);