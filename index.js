const cron = require("node-cron");
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

const {createPath} = require("./src/createPath");
const {createFolder} = require("./src/createFolder");
const {encoder} = require("./src/encoder");
const {getFilesRecursive} = require("./src/getFilesRecursive");

const dir = createPath()
createFolder(dir)

if (process.argv[2] === 'cron') {
    cron.schedule('1 * * * * *', () => {
        app()
        console.log('start cron');
    })
} else {
    app()
    console.log('start manually');
}


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


