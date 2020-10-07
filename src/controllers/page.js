/**
 * This file is the controller for the Comic chapter
 */

// Load nodejs core modules
//Load npm modules

// Load personal modules
const Page = require("../models/Page");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const {errorSMS} = require("../utils/globals");


// @desc     Get all pages of a chapter
// @route    GET /api/v1/pages
// @access   Everybody
exports.getPages = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  });
  
  // @desc     Get single page of a chapter
  // @route    GET /api/v1/pages/:id
  // @access   Everybody
  exports.getPage = asyncHandler(async (req, res, next) => {
    const page = await Page.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: [
        page
      ],
      details: errorSMS["200"]
    });
  });
  
  // @desc     Create page of a chapter
  // @route    POST /api/v1/pages
  // @access   Private/drawer
  exports.createPage = asyncHandler(async (req, res, next) => {
    const page = await Page.create(req.body);
    res.status(201).json({
      success: true,
      data: [
        page
      ],
      details: errorSMS["200"]
    });
  });

  
  // @desc     Delete page of a chapter
  // @route    DELETE /api/v1/pages/:id
  // @access   Private/Admin
  exports.deletePage = asyncHandler(async (req, res, next) => {
    await Page.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: [],
      details: errorSMS["200"]
    });
  });
  