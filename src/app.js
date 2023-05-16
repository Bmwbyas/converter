const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const {getFilesRecursive} = require("./getFilesRecursive");
const {encoder} = require("./encoder");

function app() {
    if (isMainThread) {

        const workers = [];
        const numThreads = 4; // Количество потоков

        for (let i = 0; i < numThreads; i++) {
            workers.push(new Worker(__filename, {
                workerData: {
                    index: i
                }
            }));
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
        parentPort.on('message', ({filePath}) => {
            if (!filePath) {
                return;
            }
            encoder(filePath, index)
        });
    }
}
