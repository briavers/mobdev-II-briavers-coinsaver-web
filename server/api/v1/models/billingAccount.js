const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillingAccountSchema = new Schema(
  {
    title: { type: String, required: true, max: 128 },
    savings: { type: Number, required: true, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    _expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense', required: false }],
    _type: { type: Schema.Types.ObjectId, ref: 'Type', required: false },
    user: {type: String, required: true }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

BillingAccountSchema.virtual('id').get(() => this._id);
BillingAccountSchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: '_billingAccount'
});

module.exports = mongoose.model('BillingAccount', BillingAccountSchema);