// Loading npm modules
const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
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
  id_comic: {
     type: mongoose.Schema.ObjectId, 
     ref: 'Comic' 
  },
  score:{
    type: Number,
    trim:true,
    default:0
  },
  num_of_likes:{
    type: Number,
    trim:true,
    default:0
  },
  num_of_views:{
    type: Number,
    trim:true,
    default:0
  },
  chap_number:{
    type: Number,
    trim:true,
    default:0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Chapter", ChapterSchema);