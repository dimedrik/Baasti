// Loading nodejs core modules

// Loading npm modules
const mongoose = require("mongoose");

const LikeChapterSchema = new mongoose.Schema({
    id_chapter: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Chapter' 
    },
    id_user: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("LikeChapter", LikeChapterSchema);