// Loading npm modules
const mongoose = require("mongoose");

const ViewedChapterSchema = new mongoose.Schema({
  id_comic: {
    type: mongoose.Schema.ObjectId,
    ref: "Comic"
  },
  id_chapter: {
    type: mongoose.Schema.ObjectId,
    ref: "Chapter"
  },
  id_user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ViewedChapter", ViewedChapterSchema);
