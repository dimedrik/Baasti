const multer = require('multer');
const fs = require('fs-extra'); 
const {MAIN_PATH_UPLOAD, IMG_NAME} = require('../utils/globals');
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
const util = require('util');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //forming the path where to upload the image
    //console.log(util.inspect(req.query.destination, {showHidden: false, depth: null}))
    let path = `${MAIN_PATH_UPLOAD}/${req.query.destination}`;
    fs.mkdirsSync(path);
    callback(null, path);
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, IMG_NAME+"_"+ Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage});