const fs = require('fs');
const path = require('path');
const config = require('./config');

const filesDir = config.FILES_DIR;


module.exports = {
    listFiles() {
        return fs.readdirSync(filesDir);
    },
};