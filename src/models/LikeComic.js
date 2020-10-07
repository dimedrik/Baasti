// Loading nodejs core modules

// Loading npm modules
const mongoose = require("mongoose");

const LikeComicSchema = new mongoose.Schema({
    id_comic: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Comic' 
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


module.exports = mongoose.model("LikeComic", LikeComicSchema);