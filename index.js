const {createPath} = require("./src/createPath");
const {createFolder} = require("./src/createFolder");

const {Worker}=require('worker_threads')
const {wavToMp3} = require("./src/wavToMp3");

const path = createPath()
createFolder(path)
// const worker=new Worker('./worker.js',{workerData:{path,mode:process.argv[2] }})
new wavToMp3(path)

