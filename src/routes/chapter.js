// Load nodejs core modules

// Load npm modules
const express = require("express");

// Load personal modules
const Chapter = require("../models/Chapter");
const LikeChapter = require("../models/LikeChapter");
const chapterCtrl = require("../controllers/chapter");

const advancedResults = require("../middlewares/advancedResults");
const authMid = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Chapter), chapterCtrl.getChapters)
  .post(chapterCtrl.createChapter);
router.route("/number/:id").get(chapterCtrl.numberChapter);

router
  .route("/like")
  .get(
    authMid.protect,
    advancedResults(LikeChapter),
    chapterCtrl.getLikeChapter
  );

router.route("/like").post(authMid.protect, chapterCtrl.likeChapter);
router.route("/read").post(authMid.protect, chapterCtrl.readChapter);

router.use(authMid.protect);
router.route("/:id").get(chapterCtrl.getChapter);
router.use(authMid.authorize("drawer"));
router
  .route("/:id")
  .put(chapterCtrl.updateChapter)
  .delete(chapterCtrl.deleteChapter);

module.exports = router;
