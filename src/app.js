const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const {getFilesRecursive} = require("./getFilesRecursive");
const {encoder} = require("./encoder");
const {sendFile} = require("./sendFile");


function app(dir, arrMessage) {
    if (isMainThread) {
        const workers = [];
        const numThreads = 4; // Количество потоков


        for (let i = 0; i < numThreads; i++) {

            workers.push(new Worker('./index.js', {
                workerData: {
                    index: i
                }
            }));
            workers[i].once('message', (message) => {
                arrMessage.push(message)
                if (arrMessage.length === 2) sendFile(arrMessage)
                console.log(arrMessage)

            })
        }

        const files = getFilesRecursive(dir.path)
        let i = 0
        files.forEach(file => {
            workers[i++ % numThreads].postMessage({
                filePath: file,
            })
        })

    } else {
        const {index} = workerData;
        parentPort.once('message', ({filePath}) => {
            if (!filePath) {
                return;
            }
            encoder(filePath, index)
        });
    }
}

module.exports = {app}
