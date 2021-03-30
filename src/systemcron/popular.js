// Load personal modules
const Comic = require("../models/Comic");
const LikeChapter = require("../models/LikeChapter");
const ReadChapter = require("../models/ReadChapter");
const ViewedChapter = require("../models/ViewedChapter");
const PopularComic = require("../models/PopularComic");




class PopularComicJob{
    constructor() {
        this.delta = 7; //the slice value
    }

    async processSingleComic(comic){
        //Date
        let startDate = new Date();
        let endDate = new Date();
        //Get nbrRead of all comic chapter
        let nbrReads = await ReadChapter.find({"id_comic":comic.id,"createdAt":{$gte: startDate.setDate(startDate.getDate()-this.delta),$lt: endDate}}).count();

        //Get nbrLikes of all comic chapter
        let nbrLikes = await LikeChapter.find({"id_comic":comic.id,"createdAt":{$gte: startDate.setDate(startDate.getDate()-this.delta),$lt: endDate}}).count();
        
        //Get nbrView of all comic chapter
        let nbrViews = await ReadChapter.find({"id_comic":comic.id,"createdAt":{$gte: startDate.setDate(startDate.getDate()-this.delta),$lt: endDate}}).count();

        let score = this.computeScore(nbrReads,nbrViews,nbrLikes);
        this.storeScoreInDataBase(comic.id,score);
    }


    /**
     * return the comic score (notoriety)
     * @param {sum of number of reads per chap} nbrRead 
     * @param {sum of number of views per chap} nbrViews 
     * @param {sum of number of likes per chap} nbrLikes 
     */
    computeScore(nbrReads,nbrViews,nbrLikes){
        return (0.45*nbrReads + 0.3*nbrLikes + 0.25*nbrViews);
    }

    /**
     * this function store the score in the node popular
     */
    storeScoreInDataBase(id_comic,score){
        PopularComic.create({"id_comic":id_comic,"score":score,"weight":1})
        .then(() => {
            console.log(" successfully saved..");
        }).catch((error) => {
            console.error("Error occured");
        });
    }



    async run(){
        await PopularComic.collection.drop();
        const cursor = Comic.find().cursor(); 
        for await (const comic of cursor) {
            this.processSingleComic(comic);
        }
    }
}

module.exports = PopularComicJob;