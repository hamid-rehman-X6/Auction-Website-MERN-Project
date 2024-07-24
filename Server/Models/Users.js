const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Seller", "Bidder"],
    required: true
  },
  isSellerRegistered: {
    type: Boolean,
    default: false,
  },
  isBidderRegistered: {
    type: Boolean,
    default: false,
  },
  notifications: [{  // Adding notifications field
    type: {
      type: String,  // Type of notification
      required: true
    },
    message: {
      type: String,  // Notification message
      required: true
    },
    date: {
      type: Date,    // Date of notification
      default: Date.now
    }
  }]
})



const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
