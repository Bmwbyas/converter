const cron = require("node-cron");
const fs = require('fs');

const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const {createPath} = require("./src/createPath");
const {createFolder} = require("./src/createFolder");
const {encoder} = require("./src/encoder");

if (process.argv[2] === 'cron') {
    cron.schedule('1 * * * * *', () => {
        const dir = createPath()
        createFolder(dir)
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
            let i = 0
            const sendPathWorker = (dir) => {

                fs.readdir(dir, (err, files) => {
                        if (err) throw err;

                        for (let file of files) {

                            if (file.includes('.wav')) {
                                workers[i++ % numThreads].postMessage({
                                    filePath: dir + '/' + file,
                                });
                                console.log(dir + '/' + file)
                            }
                            if (!file.includes('.')) {
                                sendPathWorker(dir + '/' + file)
                            }
                        }
                    }
                );
            }
            sendPathWorker(dir.path)

        } else {
            const {index} = workerData;
            parentPort.on('message', ({filePath}) => {
                if (!filePath) {
                    return;
                }
                encoder(filePath, index)
            });
        }
        console.log('start cron');
    })
} else {

    const dir = createPath()
    createFolder(dir)
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
        let i = 0
        const sendPathWorker = (dir) => {

            fs.readdir(dir, (err, files) => {
                    if (err) throw err;

                    for (let file of files) {

                        if (file.includes('.wav')) {
                            workers[i++ % numThreads].postMessage({
                                filePath: dir + '/' + file,
                            });
                            console.log(dir + '/' + file)
                        }
                        if (!file.includes('.')) {
                            sendPathWorker(dir + '/' + file)
                        }
                    }
                }
            );
        }
        sendPathWorker(dir.path)

    } else {
        const {index} = workerData;
        parentPort.on('message', ({filePath}) => {
            if (!filePath) {
                return;
            }
            encoder(filePath, index)
        });
    }
    console.log('start manually');
}







