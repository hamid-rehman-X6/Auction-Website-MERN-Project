
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  postalCode: {
    type: Number,
    required: true
  },
  CNIC: {
    type: String,
    required: true,
    unique: true
  },
  companyDescription: {
    type: String,
    required: true
  },

});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
