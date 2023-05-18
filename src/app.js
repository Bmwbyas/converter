const {Worker} = require('worker_threads');
const {getFilesRecursive} = require("./getFilesRecursive");
const {sendFile} = require("./sendFile");

function app(dir, arrMessage) {

    const workers = [];
    const numThreads = 4;
    for (let i = 0; i < numThreads; i++) {

        workers.push(new Worker('./src/worker.js', {
            workerData: {
                index: i
            }
        }));
        workers[i].on('message', (message) => {
            arrMessage.push(message)
            if (arrMessage.length === 2) sendFile(arrMessage)
        })
    }

    const files = getFilesRecursive(dir.path)
    let i = 0
    files.forEach(file => {
        workers[i++ % numThreads].postMessage({
            filePath: file,
        })
    })
}

module.exports = {app}
