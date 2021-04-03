/**
 * The list of all variables that we need to make the project works.
 */

//List of all error messages and code

exports.MAIN_PATH_UPLOAD = "images";
exports.IMG_NAME = "APP_NAME";
/**
 * Créer un code unique pour le success.
 */
exports.errorSMS = {
  100: { code: 100, message: "All the data  has been returned..." },
  101: { code: 101, message: "User created successfully..." },
  102: { code: 102, message: "User updated successfully..." },
  103: { code: 103, message: "User deleted successfully..." },
  104: { code: 104, message: "User token sent successfully..." },
  105: {
    code: 105,
    message: "Mail for reseting your password has been sent successfully..."
  },
  106: { code: 106, message: "User successfully updated..." },
  107: { code: 107, message: "Duplicate field value entered" },
  // 108 taken
  // 109 taken
  502: { code: 502, message: "Please select a file..." },
  501: { code: 501, message: "Please upload only an image file..." },
  503: { code: 503, message: "File uploaded successfully..." },
  200: { code: 200, message: "Successfully done the process..." },
  500: { code: 500, message: "An error occured while the process..." }
};
