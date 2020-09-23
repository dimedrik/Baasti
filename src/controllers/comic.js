/**
 * This file is the controller for the Comic strip
 */

// Load nodejs core modules
//Load npm modules

// Load personal modules
const Comic = require("../models/Comic");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const {errorSMS} = require("../utils/globals");


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
    const comic = await Comic.findById(req.params.id).populate('comic_type',['_id','title','color']);
    res.status(200).json({
      success: true,
      data: [
        comic
      ],
      details: errorSMS["200"]
    });
  });
  
  // @desc     Create Comics strip
  // @route    POST /api/v1/comics
  // @access   Private/drawer
  exports.createComic = asyncHandler(async (req, res, next) => {
    const comic = await Comic.create(req.body);
    res.status(201).json({
      success: true,
      data: [
        comic
      ],
      details: errorSMS["200"]
    });
  });
  
  // @desc     Update Comic strip
  // @route    PUT /api/v1/Comic/:id
  // @access   Private/Admin
  exports.updateComic = asyncHandler(async (req, res, next) => {
    const comic = await Comic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      success: true,
      data: [
        comic
      ],
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
      data: [],
      details: errorSMS["200"]
    });
  });
  