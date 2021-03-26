module.exports = class CronJob {
    constructor(cron) {
        this.cron = cron;
    }
    /**
     * set all your jobs here
     */
    compute(){
        /**
         * this job compute the slide content.
         */
        this.cron.schedule('*/5 * * * * *', () => {
            console.log('running a task every 5 seconds...');
        }).stop();
    }
 }

