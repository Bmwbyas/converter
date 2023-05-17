const cron = require("node-cron");
const {createPath} = require("./src/createPath");
const {createFolder} = require("./src/createFolder");
const {app} = require("./src/app");

const arrMessage=[]
const dir = createPath()
createFolder(dir)

if (process.argv[2] === 'cron') {
    cron.schedule('1 * * * * *', () => {
      app(dir,arrMessage)
        console.log('start cron');
    })
} else {
    app(dir,arrMessage)
    console.log('start manually');

}




