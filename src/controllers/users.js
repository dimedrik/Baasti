// Load nodejs core modules

//Load npm modules

// Load personal modules
const User = require("../models/User");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const {MAIN_PATH_UPLOAD} = require('../utils/globals');
const {errorSMS} = require("../utils/globals");

// @desc     Get all users
// @route    GET /api/v1/users
// @access   Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     Get single user
// @route    GET /api/v1/users/:id
// @access   Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: user,
    details: errorSMS["100"]
  });
});

// @desc     Create user
// @route    POST /api/v1/users
// @access   Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
    details: errorSMS["101"]
  });
});

// @desc     Update user
// @route    PUT /api/v1/users/:id
// @access   Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
    details: errorSMS["102"]
  });
});

// @desc     Delete user
// @route    DELETE /api/v1/users/:id
// @access   Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
    details: errorSMS["103"]
  });
});
