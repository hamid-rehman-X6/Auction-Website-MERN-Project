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
  }
})



const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;


// UserSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };