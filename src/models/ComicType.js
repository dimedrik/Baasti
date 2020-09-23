// Loading nodejs core modules

// Loading npm modules
const mongoose = require("mongoose");

const ComicTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title"]
  },
  description: {
    type: String,
    trim: true
  },

  color: {
    type: String,
    trim: true,
    required: [true, "Please add a color"]
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("ComicType", ComicTypeSchema);