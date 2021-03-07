/**
 * This file is the controller for the Comic chapter
 */

// Load nodejs core modules
//Load npm modules

// Load personal modules
const Chapter = require("../models/Chapter");
const LikeChapter = require("../models/LikeChapter");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const {errorSMS} = require("../utils/globals");


// @desc     Get all chapters of a Comic
// @route    GET /api/v1/chapters/:id
// @access   Everybody
exports.getChapters = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  });
  
  // @desc     Get single Comic chapter
  // @route    GET /api/v1/chapters/:id
  // @access   Everybody
  exports.getChapter = asyncHandler(async (req, res, next) => {
    const chapter = await Chapter.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: chapter,
      details: errorSMS["200"]
    });
  });
  
  // @desc     Create Comic chapter
  // @route    POST /api/v1/chapters
  // @access   Private/drawer
  exports.createChapter = asyncHandler(async (req, res, next) => {
    const chapter = await Chapter.create(req.body);
    res.status(201).json({
      success: true,
      data: chapter,
      details: errorSMS["200"]
    });
  });

  // @desc     Number of chapters for a Comic
  // @route    get /api/v1/chapters/number/:id
  // @access   Everybody
  exports.numberChapter = asyncHandler(async (req, res, next) => {
    const num = await Chapter.countDocuments({id_comic : req.params.id});
    res.status(201).json({
      success: true,
      data: {"number" : num},
      details: errorSMS["200"]
    });
  });
  
  // @desc     Update Comic chapter
  // @route    PUT /api/v1/chapters/:id
  // @access   Private/Drawer
  exports.updateChapter = asyncHandler(async (req, res, next) => {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      success: true,
      data: chapter,
      details: errorSMS["200"]
    });
  });
  
  // @desc     Delete Comic chapter
  // @route    DELETE /api/v1/chapters/:id
  // @access   Private/Admin
  exports.deleteChapter = asyncHandler(async (req, res, next) => {
    await Chapter.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: {},
      details: errorSMS["200"]
    });
  });


// @desc     Get all likes by chapter
// @route    GET /api/v1/chapters/like
// @access   Everybody
exports.getLikeChapter = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     Like Comic strip By user
// @route    POST /api/v1/chapters/like
// @access   Everyone
exports.likeChapter = asyncHandler(async (req, res, next) => {
  //if the document already exists then remove, else create it.
  const existance = await LikeChapter.exists(req.body);
  if(existance){
    //Aggreger les données!!! decrementer
    await Chapter.findOneAndUpdate({"_id":req.body.id_chapter,num_of_likes:{$gt: 0}}, { $inc: {'num_of_likes': -1} });
    await LikeChapter.findOneAndDelete(req.body);
          res.status(200).json({
            success: true,
            data: {},
            details: errorSMS["200"]
          });
  }else{
    //incrementation
    await Chapter.findOneAndUpdate({"_id":req.body.id_chapter}, { $inc: {'num_of_likes': 1}});
    const likeChapter = await LikeChapter.create(req.body);
          res.status(201).json({
            success: true,
            data: likeChapter,
            details: errorSMS["200"]
          });
  }
});

  