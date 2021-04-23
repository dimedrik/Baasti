// Model for the slide
const mongoose = require("mongoose");

const PopularComicSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    id_comic:{
        type: mongoose.Schema.ObjectId, 
        ref: 'Comic' 
    },
    score:{
        type: Number,
        default: 0
    },
    weight:{
        type: Number,
        default: 1
    }
});


module.exports = mongoose.model("PopularComic",PopularComicSchema);