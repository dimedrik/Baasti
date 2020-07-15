const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const {errorSMS} = require("../utils/globals");
const {MAIN_PATH_UPLOAD} = require('../utils/globals');

exports.uploadFile = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: 'File uploaded...'});
});


exports.upload = asyncHandler(async(req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new ErrorResponse(errorSMS[500].sms,errorSMS[500].code);
    return next(error)
  }else if(file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
    let fullUrl = req.protocol + '://' + req.get('host');
    file['url'] = fullUrl +file.path.split(MAIN_PATH_UPLOAD)[1];
    res.send(file);
  }
  const error = new ErrorResponse(errorSMS[501].sms,errorSMS[501].code);
    return next(error) 
});

exports.uploadMulti = asyncHandler(async(req, res, next) => {
  const files = req.files;
  //util.inspect(files, {showHidden: false, depth: null})
  if (!Object.keys(files).length) {
    const error = new ErrorResponse(errorSMS[500].sms,errorSMS[500].code);
    return next(error)
  }//else if(files.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
    res.send(files)
  //}
  //const error = new ErrorResponse('Please upload an image file',501);
  //return next(error)
});