// Loading npm modules
const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  url: {
    type: String,
    trim: true
  },
  id_comic: {
     type: mongoose.Schema.ObjectId, 
     ref: 'Comic' 
  },
  id_chapter: {
    type: mongoose.Schema.ObjectId, 
    ref: 'Chapter' 
  },
  page_number:{
    type: Number,
    trim:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Page", PageSchema);