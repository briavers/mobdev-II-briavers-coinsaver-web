const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema(
  {
    title: { type: String, required: true, max: 128 },
    description: { type: String, required: true, max: 256 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    image: { type: String, required: true, max: 128, default: './uploads/bankingCards/Mastercard.jpg' }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

TypeSchema.virtual('id').get(() => this._id);


TypeSchema.virtual('billingAccounts', {
  ref: 'BillingAccount',
  localField: '_id',
  foreignField: '_type',
  justOne: false
});
module.exports = mongoose.model('Type', TypeSchema);