const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const {errorSMS} = require("../utils/globals");
const {MAIN_PATH_UPLOAD} = require('../utils/globals');

exports.uploadFile = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    details: errorSMS["503"],
    data: {}
  });
});


/**
 * 
 */
exports.upload = asyncHandler(async(req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new ErrorResponse(errorSMS[502].message,errorSMS[502].code);
    return next(error)
  }else if(file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
    let fullUrl = req.protocol + '://' + req.get('host');
    res.status(200).json({
      success: true,
      details: errorSMS["503"],
      data: 
        {
          "encoding": file['encoding'],
          "mimetype": file['mimetype'],
          "destination": file['destination'],
          "size": file['size'],
          "url": fullUrl +file.path.split(MAIN_PATH_UPLOAD)[1]
        }
    });
  }
  const error = new ErrorResponse(errorSMS[501].message,errorSMS[501].code);
    return next(error) 
});

exports.uploadMulti = asyncHandler(async(req, res, next) => {
  const files = req.files;
  //util.inspect(files, {showHidden: false, depth: null})
  if (!Object.keys(files).length) {
    const error = new ErrorResponse(errorSMS[502].message,errorSMS[502].code);
    return next(error)
  }//else if(files.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
    res.send(files)
  //}
  //const error = new ErrorResponse('Please upload an image file',501);
  //return next(error)
});