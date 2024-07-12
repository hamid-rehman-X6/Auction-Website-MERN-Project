const express = require("express");
const route = express.Router();
const BidController = require("../Controllers/bidController");


route.get("/bids/bidder/:bidderId", BidController.getBidsProducts);

module.exports = route;