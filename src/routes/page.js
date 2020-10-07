// Load nodejs core modules

// Load npm modules
const express = require("express");

// Load personal modules
const Page = require("../models/Page");
const pageCtrl = require("../controllers/page");

const advancedResults = require("../middlewares/advancedResults");
const authMid = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(advancedResults(Page), pageCtrl.getPages).post(pageCtrl.createPage);
router.use(authMid.protect);
router.use(authMid.authorize("drawer"));
router.route("/:id").get(pageCtrl.getPage).delete(pageCtrl.deletePage);

module.exports = router;
