const {encoder} = require("./encoder");
const {parentPort, workerData} = require('worker_threads');

const {index} = workerData;
parentPort.on('message', ({filePath}) => {
    if (!filePath) {
        return;
    }
    encoder(filePath, index)
});


