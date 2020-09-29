// Loading npm modules
const mongoose = require("mongoose");

const ComicSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title"]
  },
  abstract: {
    type: String,
    trim: true
  },
  cover: {
    type: String,
    trim: true
  },
  author: {
     type: mongoose.Schema.ObjectId, 
     ref: 'User' 
  },
  comic_type:{
    type: mongoose.Schema.ObjectId, 
    ref: 'ComicType' 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Comic", ComicSchema);