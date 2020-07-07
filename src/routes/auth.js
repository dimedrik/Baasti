// Load nodejs core modules

//Load npm modules
const express = require("express");

// load personal modules
const authCtrl = require("../controllers/auth");

const authMid = require("../middlewares/auth");

const router = express.Router();

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/me", authMid.protect, authCtrl.getMe);
router.put("/updatedetails", authMid.protect, authCtrl.updateDetails);
router.put("/updatepassword", authMid.protect, authCtrl.updatePassword);
router.post("/forgotpassword", authCtrl.forgotPassword);
router.put("/resetpassword/:resetToken", authCtrl.resetPassword);

module.exports = router;
