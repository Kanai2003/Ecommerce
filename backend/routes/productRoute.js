const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// read 
router.route("/products")
    .get(getAllProducts);

router.route("/admin/products")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// create
router.route("/admin/products/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

//update & delete 
router.route("/admin/products/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// get product details 
router.route("/products/:id")
    .get(getProductDetails);

router.route("/review")
    .put(isAuthenticatedUser, createProductReview);

router.route("/review")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteProductReview);


module.exports = router 