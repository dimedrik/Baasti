// Loading nodejs core modules
//All favorites comics for users
// Loading npm modules
const mongoose = require("mongoose");

const UserFavComicSchema = new mongoose.Schema({
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


module.exports = mongoose.model("UserFavComic", UserFavComicSchema);