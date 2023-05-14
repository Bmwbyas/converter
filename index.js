require('dotenv').config()

const {createPath} = require("./src/createPath");
const {createFolder} = require("./src/createFolder");

const {Worker}=require('worker_threads')


const path = createPath()
createFolder(path)
const worker=new Worker('./worker.js',{workerData:{path,mode:process.argv[2] }})


