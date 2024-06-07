const mongoose = require("mongoose");

const bidderSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true
      },
    lastName:{
        type: String,
        require: true
      },
    address:{
        type: String,
        require: true
      },
    phoneNumber:{
        type: String,
        require: true
      },

    CNIC:{
        type: String, 
        require:true,
        unique:true
    }

})

const Bidder = mongoose.model("Bidder" , bidderSchema);

module.exports = Bidder;