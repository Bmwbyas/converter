const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
const Lame = require("node-lame").Lame


class wavToMp3 {
    constructor(props) {
        this._props = props;
        this.config = {
            inputFolder: this._props.path,
            bitrate: 192
        }
        this.watchFolder(false)
    }

    encodeIfNeeded(file) {
        if (!this.fileIsWAV(file)) return
        this.encodeFile(file)
    }

    fileIsWAV(filename) {
        let extension = path.extname(filename)
        return (extension === '.wav')
    }

    encodeFile(file) {
        const pathMp3 = path.dirname(file) + '/' + path.parse(file).name + '.mp3'
        const encoder = new Lame({
            output: pathMp3,
            bitrate: this.config.bitrate,
        }).setFile('./' + file)

        encoder
            .encode()
            .then(() => {
                console.log('Success: ' + file);
                fs.unlink(file, (err) => {
                    if (err) throw err
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    watchFolder(isWatch) {

        let options = {
            ignored: /^\./,
            persistent: isWatch,
            interval: 2000,
            cwd: '.',

        }

        let that = this
        let watcher = chokidar.watch(this.config.inputFolder, options)

        watcher
            .on('add', function (path) {
                that.encodeIfNeeded(path)
                // console.log(that.config.inputFolder)
            })
            .on('change', function (path) {
                that.encodeIfNeeded(path)
            })
            .on('unlink', function (path) {
                console.log('File', path, 'has been removed')
            })
            .on('error', function (error) {
                console.error('Error happened', error)
            })
    }
}

module.exports = {wavToMp3}
