
// Model for the slide
const mongoose = require("mongoose");
//type: Number, default: (new Date()).getTime()
const ComicSlideSchema = new mongoose.Schema({
  period: {
    type: Number, 
    default: (new Date()).getTime()
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  content: [
    {
        id_comic:{
            type: mongoose.Schema.ObjectId, 
            ref: 'Comic' 
        },
        score:{
            type: Number,
            default: 0
        },
        weight:{
            type: Date,
            default: 1
        }
    }
  ]
});


module.exports = mongoose.model("ComicSlide", ComicSlideSchema);