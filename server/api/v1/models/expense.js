const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseScheme = new Schema(
  {
    title: { type: String, required: true, max: 128 },
    description: { type: String, required: false },
    amount: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    _billingAccount: { type: Schema.Types.ObjectId, ref: 'BillingAccount', required: false },
    _subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: false },
    expenseImage: {type: String, required: false},
    user: {type: String, required: true }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

ExpenseScheme.virtual('id').get(() => this._id);
ExpenseScheme.virtual('billingAccounts', {
  ref: 'BillingAccount',
  localField: '_id',
  foreignField: '_expenses'
});

module.exports = mongoose.model('Expense', ExpenseScheme);