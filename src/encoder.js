const {Lame} = require("node-lame");
const path = require('path');
const fs = require('fs');

const encoder=(filePath,index)=>{
    const pathMp3 = path.dirname(filePath) + '/' + path.parse(filePath).name + '.mp3'
    const encoder = new Lame({
        output: pathMp3,
        bitrate: 192,
    }).setFile('./' + filePath)
    encoder
        .encode()
        .then(() => {
            console.log('Worker ' + index + ' Success: ' + filePath);
            fs.unlink(filePath, (err) => {
                if (err) throw err
            })
        })
        .catch(error => {
            console.log(error)
        });
}
module.exports = {encoder}
