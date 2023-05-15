const path = require('path')
const fs = require('fs')
const Lame = require("node-lame").Lame


class wavToMp3 {
    constructor(props) {
        this.config = {
            inputFolder: props.path,
            bitrate: 192,
        }
        this.getFilesRecursive('input/out/test')

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

  getFilesRecursive(path) {

       fs.readdir(path, (err, files) => {
            if(err) throw err;

            for (let file of files){
                if(file.includes('.wav')){
                    this.encodeFile(path+'/'+file)
                }
                if(!file.includes('.')){
                    this.getFilesRecursive(path+'/'+file)
                }
            }
        }
    );
}
}

module.exports = {wavToMp3}
