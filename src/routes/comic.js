// Load nodejs core modules

// Load npm modules
const express = require("express");

// Load personal modules
const Comic = require("../models/Comic");
const LikeComic = require("../models/LikeComic");
const UserFavComic = require("../models/UserFavComic");
const comicCtrl = require("../controllers/comic");

const advancedResults = require("../middlewares/advancedResults");
const authMid = require("../middlewares/auth");

const router = express.Router();

router.use(authMid.protect);
router
  .route("/")
  .get(advancedResults(Comic, ["comic_type", "author"]), comicCtrl.getComics)
  .post(comicCtrl.createComic);
router.route("/recent").get(comicCtrl.getRecent);
router
  .route("/recentlyread")
  .get(authMid.protect, comicCtrl.getRecentlyReadComics);
router
  .route("/recentlyviewed")
  .get(authMid.protect, comicCtrl.getRecentlyViewedComics);
router
  .route("/popular")
  .get(advancedResults(Comic, ["comic_type", "author"]), comicCtrl.getPopular);
router
  .route("/like")
  .get(advancedResults(LikeComic), comicCtrl.getLikeComic)
  .post(comicCtrl.likeComic);
router
  .route("/fav")
  .get(advancedResults(UserFavComic), comicCtrl.getUSerFavComic)
  .post(comicCtrl.addUserFavComic);
router.route("/slide").get(comicCtrl.getComicSlide);
router.use(authMid.authorize("drawer"));
router.route("/:id").get(comicCtrl.getComic);
router.route("/:id").put(comicCtrl.updateComic).delete(comicCtrl.deleteComic);

module.exports = router;
