// Load nodejs core modules

// Load npm modules
const express = require("express");

// Load personal modules
const Chapter = require("../models/Chapter");
const chapterCtrl = require("../controllers/chapter");

const advancedResults = require("../middlewares/advancedResults");
const authMid = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(advancedResults(Chapter), chapterCtrl.getChapters).post(chapterCtrl.createChapter);
router.route("/number/:id").get(chapterCtrl.numberChapter);
router.use(authMid.protect);
router.use(authMid.authorize("drawer"));
router.route("/:id").get(chapterCtrl.getChapter).put(chapterCtrl.updateChapter).delete(chapterCtrl.deleteChapter);

module.exports = router;
