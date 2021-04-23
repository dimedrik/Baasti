/**
 * This file is the controller for the Comic Type
 */

// Load nodejs core modules
//Load npm modules

// Load personal modules
const ComicType = require("../models/ComicType");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const {errorSMS} = require("../utils/globals");

// @desc     Get all Comic Type
// @route    GET /api/v1/comics_types
// @access   Everybody
exports.getComicTypes = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  });
  
  // @desc     Get single ComicType
  // @route    GET /api/v1/comics_types/:id
  // @access   Everybody
  exports.getComicType = asyncHandler(async (req, res, next) => {
    const comicType = await ComicType.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: comicType,
      details: errorSMS["200"]
    });
  });
  
  // @desc     Create Comics strip
  // @route    POST /api/v1/comics_types
  // @access   Private/Admin
  exports.createComicType = asyncHandler(async (req, res, next) => {
    const comicType = await ComicType.create(req.body);
    res.status(201).json({
      success: true,
      data: comicType,
      details: errorSMS["200"]
    });
  });
  
  // @desc     Update ComicType
  // @route    PUT /api/v1/comics_types/:id
  // @access   Private/Admin
  exports.updateComicType = asyncHandler(async (req, res, next) => {
    const comicType = await ComicType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      success: true,
      data: comicType,
      details: errorSMS["200"]
    });
  });
  
  // @desc     Delete ComicType
  // @route    DELETE /api/v1/comics_types/:id
  // @access   Private/Admin
  exports.deleteComicType = asyncHandler(async (req, res, next) => {
    await ComicType.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: {},
      details: errorSMS["200"]
    });
  });
  