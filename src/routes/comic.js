// Load nodejs core modules

// Load npm modules
const express = require("express");

// Load personal modules
const Comic = require("../models/Comic");
const comicCtrl = require("../controllers/comic");

const advancedResults = require("../middlewares/advancedResults");
const authMid = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(advancedResults(Comic,['comic_type','author']), comicCtrl.getComics).post(comicCtrl.createComic);

router.use(authMid.protect);
router.use(authMid.authorize("drawer"));
router.route("/:id").get(comicCtrl.getComic).put(comicCtrl.updateComic).delete(comicCtrl.deleteComic);

module.exports = router;
