const {workerData} = require('worker_threads')
const {wavToMp3} = require("./src/wavToMp3");
const cron = require("node-cron");

if (workerData.mode === 'cron') {
    cron.schedule('1 * * * * *', () => {
        new wavToMp3(workerData.path);
        console.log('start cron');
    })
} else {
    new wavToMp3(workerData);
    console.log('start manually');
}


