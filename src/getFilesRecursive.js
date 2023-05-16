const fs = require("fs");


function getFilesRecursive(dir) {
    const dirents = fs.readdirSync(dir)
    const files = dirents
        .filter(dirent => dirent.slice(-4) === '.wav')
        .map(dirent => dir+"/"+dirent )
    const folders = dirents.filter(dirent => !dirent.includes('.'))
    for (const folder of folders) {
        const folderPath = dir+"/"+folder
        files.push(...getFilesRecursive(folderPath))
    }
    return files
}

module.exports = {getFilesRecursive}
