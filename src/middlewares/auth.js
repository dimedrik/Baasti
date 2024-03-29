// Load nodejs core modules

// Load npm modules
const config = require("config");
const jwt = require("jsonwebtoken");

// Load personal modules
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User.js");

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Set token to bearer token or from cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    //Verify token
    const decoded = jwt.verify(token, config.get("jwt.secret"));
    const user = await User.findById(decoded.id);

    if (!user) {
      next(new ErrorResponse(`User with id ${decoded.id} not found`, 404));
    }
    req.user = user;
    // req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
