// Load personal modules
const Comic = require("../models/Comic");
const LikeChapter = require("../models/LikeChapter");
const ReadChapter = require("../models/ReadChapter");
const ViewedChapter = require("../models/TmpSlide");
const ComicSlide = require("../models/ComicSlide");




class Slide{
    constructor() {
        this.nbrComic = 0;
        this.nbrComicSaved = 0;
        this.delta = 7; //the slice value
        this.size = 5;
    }

    async processSingleComic(comic){
        //Date
        let startDate = new Date();
        let endDate = new Date();
        //Get nbrRead of all comic chapter
        let nbrRead = await ReadChapter.find({"id_comic":comic.id,"createdAt":{$gte: startDate.setDate(startDate.getDate()-this.delta),$lt: endDate}}).count();

        //Get nbrLikes of all comic chapter
        let nbrLikes = await LikeChapter.find({"id_comic":comic.id,"createdAt":{$gte: startDate.setDate(startDate.getDate()-this.delta),$lt: endDate}}).count();
        
        //Get nbrView of all comic chapter
        let nbrView = await ReadChapter.find({"id_comic":comic.id,"createdAt":{$gte: startDate.setDate(startDate.getDate()-this.delta),$lt: endDate}}).count();

        let score = this.computeScore(nbrViews,nbrLikes);
        this.storeScoreInDataBase(comic.id,score);
    }


    /**
     * return the comic score accros a period
     * @param {sum of number of views per chap} nbrViews 
     * @param {sum of number of likes per chap} nbrLikes 
     */
    computeScore(nbrViews,nbrLikes){
        return (0.6*nbrViews + 0.4*nbrLikes);
    }

    /**
     * this function store the score in a temporary node on mongo
     */
    storeScoreInDataBase(id_comic,score){
        //tmp = new TmpSlide
        TmpSlide.create({"id_comic":id_comic,"score":score,"weight":1})
        .then(() => {
            console.log(" successfully saved..");
            this.nbrComicSaved = this.nbrComicSaved + 1;
            if(this.nbrComicSaved == this.nbrComic){
                console.log("The last one...");
                TmpSlide.find({}).sort('-score').limit(this.size).exec(function(err, slides) {
                    let content = [];
                    slides.forEach(slide => {
                        content.push({"id_comic":slide.id_comic,"score":slide.score,"weight":slide.weight});
                    });
                    ComicSlide.create({"content":content})
                    .then(() => {console.log(" successfully computed..");}).catch((error) => {
                        console.error("Error occured");
                    });
                 });
            }
        }).catch((error) => {
            console.error("Error occured");
        });
    }



    async run(){
        await TmpSlide.collection.drop();
        this.nbrComic = await Comic.find().count();
        const cursor = Comic.find().cursor(); 
        for await (const comic of cursor) {
            this.processSingleComic(comic);
        }
    }
}

module.exports = Slide;