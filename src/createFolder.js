const fs = require('fs');
const createFolder = (props) => {
    fs.mkdirSync(props.path, {recursive: true});
}

module.exports = {createFolder}
