/**
 * This file is the controller for the Comic strip
 */

// Load nodejs core modules
//Load npm modules

// Load personal modules
const Comic = require("../models/Comic");
const ComicSlide = require("../models/ComicSlide");
const LikeComic = require("../models/LikeComic");
const UserFavComic = require("../models/UserFavComic");
const ReadChapter = require("../models/ReadChapter");
const ViewedChapter = require("../models/ViewedChapter");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const {errorSMS} = require("../utils/globals");
const { rawListeners } = require("../models/Comic");

// @desc     Get all Comic strip
// @route    GET /api/v1/comics
// @access   Everybody
exports.getComics = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     Get single Comic strip
// @route    GET /api/v1/comic/:id
// @access   Everybody
exports.getComic = asyncHandler(async (req, res, next) => {
  const comic = await Comic.findById(req.params.id).populate("comic_type", [
    "_id",
    "title",
    "color"
  ]);

  res.status(200).json({
    success: true,
    data: comic,
    details: errorSMS["200"]
  });
});


  // @desc     Get the most recent Comic Slide
  // @route    GET /api/v1/comic/slide
  // @access   Everybody
  exports.getComicSlide = asyncHandler(async (req, res, next) => {
    const comicSlide = await ComicSlide.findOne().sort('-createdAt').populate({
        path: 'content.id_comic',
        populate: {
           path: 'comic_type',
           model: 'ComicType'
        }
     });
    res.status(200).json({
      success: true,
      data: comicSlide?comicSlide.content:[],
      details: errorSMS["200"]
    });
  });


  // @desc     Get popular Comic
  // @route    GET /api/v1/comic/popular
  // @access   Everybody
  exports.getPopular = asyncHandler(async (req, res, next) =>{
    res.status(200).json(res.advancedResults);
    /*const comics = await Comic.find({})
    console.log(comics)
    res.status(200).json({
      success: true,
      data: comics,
      details: errorSMS["200"]
    });*/
  })


exports.getRecent = asyncHandler(async (req, res, next) => {
  const comics = await Comic.find({}).sort("-updatedAt");
  res.status(200).json({
    success: true,
    data: comics,
    details: errorSMS["200"]
  });
});

// @desc     Create Comics strip
// @route    POST /api/v1/comics
// @access   Private/drawer
exports.createComic = asyncHandler(async (req, res, next) => {
  const comic = await Comic.create(req.body).sort("-num_of_likes");
  res.status(201).json({
    success: true,
    data: comic,
    details: errorSMS["200"]
  });
});

// @desc     Update Comic strip
// @route    PUT /api/v1/Comic/:id
// @access   Private/Admin
exports.updateComic = asyncHandler(async (req, res, next) => {
  const comic = await Comic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: comic,
    details: errorSMS["200"]
  });
});

// @desc     Delete Comic strip
// @route    DELETE /api/v1/comic/:id
// @access   Private/Admin
exports.deleteComic = asyncHandler(async (req, res, next) => {
  await Comic.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
    details: errorSMS["200"]
  });
});

// @desc     get like Comic strip By user, comics according to params
// @route    GET /api/v1/comics/like
// @access   Everyone
exports.getLikeComic = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     Like Comic strip By user
// @route    POST /api/v1/comics/like
// @access   Everyone
exports.likeComic = asyncHandler(async (req, res, next) => {
  //if the document already exists then remove, else create it.
  const existance = await LikeComic.exists(req.body);
  if (existance) {
    //Aggreger les données!!!
    await Comic.findOneAndUpdate(
      { _id: req.body.id_comic, num_of_likes: { $gt: 0 } },
      { $inc: { num_of_likes: -1 } }
    );
    await LikeComic.findOneAndDelete(req.body);
    res.status(200).json({
      success: true,
      data: {},
      details: errorSMS["200"]
    });
  } else {
    await Comic.findOneAndUpdate(
      { _id: req.body.id_comic },
      { $inc: { num_of_likes: 1 } }
    );
    const likeComic = await LikeComic.create(req.body);
    res.status(201).json({
      success: true,
      data: likeComic,
      details: errorSMS["200"]
    });
  }
});

// @desc     Delete Like Comic strip
// @route    DELETE /api/v1/comics/like/:id
// @access   EveryOne
exports.deleteLikeComic = asyncHandler(async (req, res, next) => {
  await LikeComic.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
    details: errorSMS["200"]
  });
});

// @desc     get fav comics by user,
// @route    GET /api/v1/comics/fav
// @access   Everyone
exports.getUSerFavComic = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     add a Comic to user fav list
// @route    POST /api/v1/comics/fav
// @access   Everyone
exports.addUserFavComic = asyncHandler(async (req, res, next) => {
  //if the document already exists then remove, else create it.
  const existance = await UserFavComic.exists(req.body);
  if (existance) {
    await UserFavComic.findOneAndDelete(req.body);
    res.status(200).json({
      success: true,
      data: {},
      details: errorSMS["200"]
    });
  } else {
    const userFavComic = await UserFavComic.create(req.body);
    res.status(201).json({
      success: true,
      data: userFavComic,
      details: errorSMS["200"]
    });
  }
});

// @desc     Get recently read Comics
// @route    GET /api/v1/comic/recentlyread
// @access   Private
exports.getRecentlyReadComics = asyncHandler(async (req, res, next) => {
  const readChapter = await ReadChapter.find({ id_user: req.user._id }).sort(
    "-createdAt"
  );
  const readChapterComicIds = readChapter.map((elt) => elt.id_comic);

  const readChapterComicUniqueIds = Array.from(new Set(readChapterComicIds));

  const readComics = await Comic.find({ _id: readChapterComicIds }).populate([
    "comic_type",
    "author"
  ]);

  res.status(200).json({
    success: true,
    data: readComics,
    details: errorSMS["200"]
  });
});

// @desc     Get recently viewed Comics
// @route    GET /api/v1/comic/recentlyviewed
// @access   Private
exports.getRecentlyViewedComics = asyncHandler(async (req, res, next) => {
  console.log("Herrrrrrrrrrrrrrrrr");
  const viewedChapters = await ViewedChapter.find({
    id_user: req.user._id
  }).sort("-createdAt");
  const viewedChapterComicIds = viewedChapters.map((elt) => elt.id_comic);

  const viewedChapterComicUniqueIds = Array.from(
    new Set(viewedChapterComicIds)
  );

  const viewedComics = await Comic.find({
    _id: viewedChapterComicIds
  }).populate(["comic_type", "author"]);

  res.status(200).json({
    success: true,
    data: viewedComics,
    details: errorSMS["200"]
  });
});
