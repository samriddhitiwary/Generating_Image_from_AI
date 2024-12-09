const express = require("express");
const {registerController,loginController,logoutController,refetchController,} = require("../controllers/authController");
const router = express.Router();


// REGISTER
router.post("/register",registerController);

// LOGIN
router.post("/login",loginController);

// LOG-out
router.get("/logout",logoutController);

// FETCH CURRENT USER
router.get("/refetch",refetchController);

module.export = router;

