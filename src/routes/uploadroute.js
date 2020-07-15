// Load nodejs core modules

// Load npm modules
const express = require("express");

// Load personal modules
const uploadCtrl = require("../controllers/uploadctrl");
const uploadMiddle = require("../middlewares/uploadfile");

//const authMid = require("../middlewares/auth");

const router = express.Router();

//router.use(authMid.protect);
//router.use(authMid.authorize("admin"));

//router.route("/").post(uploadMiddle,uploadCtrl.uploadFile);

router.route("/uploadfile").post(uploadMiddle.single('image'),uploadCtrl.upload);

router.route("/uploadmultiple").post(uploadMiddle.array('image', 12),uploadCtrl.uploadMulti);

module.exports = router;
