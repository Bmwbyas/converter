require('dotenv').config()
const cron = require('node-cron');

const {createPath} = require("./src/createPath");
const {wavToMp3} = require("./src/wavToMp3");
const {createFolder} = require("./src/createFolder");

if (process.argv[2] === 'cron') {
    cron.schedule('1 * * * * *', () => {
        const path = createPath()
        createFolder(path)
        new wavToMp3(path);
        console.log('start cron');
    })
} else {
    const path = createPath()
    createFolder(path)
    new wavToMp3(path);
    console.log('start manually');
}
