const express = require("express");
const route = express.Router();
const productController = require("../Controllers/productController");

route.post("/products/post", productController.createProduct);
route.get("/products/get", productController.getAll);
route.delete("/products/delete/:id", productController.deleteProduct);


// get single product
route.get("/products/:id", productController.getbyId);

route.get("/products/seller/:sellerId", productController.getProductsBySellerId);

module.exports = route;
