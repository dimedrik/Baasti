// Load nodejs core modules

// Load npm modules
const express = require("express");

// Load personal modules
const ComicType = require("../models/ComicType");
const comicTypeCtrl = require("../controllers/comicType");

const User = require("../models/User");

const advancedResults = require("../middlewares/advancedResults");
const authMid = require("../middlewares/auth");

const router = express.Router();
/*router.use(authMid.protect);
router.use(authMid.authorize("drawer"));*/
router.route("/")
        .get(advancedResults(ComicType), comicTypeCtrl.getComicTypes)
        .post(comicTypeCtrl.createComicType);
router.route("/:id").get(comicTypeCtrl.getComicType);

module.exports = router;
