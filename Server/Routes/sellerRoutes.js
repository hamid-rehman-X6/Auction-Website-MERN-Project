const express = require("express");
const router = express.Router();
const sellerController = require("../Controllers/sellerController");

router.post("/seller", sellerController.registerSeller);
router.get("/getallsellers", sellerController.getAllSellers);

module.exports = router;
