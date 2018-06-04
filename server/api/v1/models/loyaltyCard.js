const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LoyaltyCardScheme = new Schema(
  {
    storeImg: { type: String, required: true, max: 128 },
    code: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    user: {type: String, required: false }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

LoyaltyCardScheme.virtual('id').get(() => this._id);

module.exports = mongoose.model('LoyaltyCard', LoyaltyCardScheme);