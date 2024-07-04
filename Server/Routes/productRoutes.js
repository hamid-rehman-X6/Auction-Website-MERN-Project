const express = require("express");
const route = express.Router();
const productController = require("../Controllers/productController");

// Define specific routes first
route.get("/auctionedProducts", productController.getAuctionedProduct);
route.put("/products/placeAuction/:id", productController.placeProductForAuction);

// Define other routes
route.post("/products/post", productController.createProduct);
route.get("/products/get", productController.getAll);
route.get("/products/seller/:userId", productController.getProductsBySellerId);
route.get("/products/:id", productController.getbyId);
route.delete("/products/delete/:id", productController.deleteProduct);
route.put("/products/update/:id", productController.updateProduct);

module.exports = route;
