const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// read 
router
    .route("/products")
    .get(getAllProducts);

// create
router
    .route("/products/new")
    .post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);

//update & delete 
router
    .route("/products/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct);
    
// get product details 
router
    .route("/products/:id")
    .get(getProductDetails);


module.exports = router 