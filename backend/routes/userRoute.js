const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")

const router = express.Router();



router.route("/register").post(registerUser);

router.route("/login").post(loginUser); 

router.route("/password/forgot").post(forgotPassword) //bug🪲

router.route("/password/reset/:token").put(resetPassword);  //not checked

router.route("/me").get(isAuthenticatedUser, getUserDetails);    

router.route("/password/update").put(isAuthenticatedUser, updatePassword);   

router.route("/me/update").put(isAuthenticatedUser, updateProfile);  


router.route("/logout").get(logout);

router.route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);     //not checked

router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);       //not checked

module.exports = router;



