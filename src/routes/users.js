// Load nodejs core modules

// Load npm modules
const express = require("express");

// Load personal modules
const User = require("../models/User");
const userCtrl = require("../controllers/users");

const advancedResults = require("../middlewares/advancedResults");
const authMid = require("../middlewares/auth");

const router = express.Router();

router.use(authMid.protect);
router.use(authMid.authorize("admin"));

router.route("/").get(advancedResults(User), userCtrl.getUsers).post(userCtrl.createUser);

router.route("/:id").get(userCtrl.getUser).put(userCtrl.updateUser).delete(userCtrl.deleteUser);

module.exports = router;
