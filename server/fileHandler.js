const fs = require('fs');
const path = require('path');
const config = require('./config');

const filesDir = config.FILES_DIR;


module.exports = {
    listFiles() {
        return fs.readdirSync(filesDir);
    },

    readFile(filename) {
        const filePath = path.join(filesDir, filename);
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        }
        throw new Error('File nuk u gjet');
    },

    deleteFile(filename) {
        const filePath = path.join(filesDir, filename);
        if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
            return true;
        }
        throw new Error('File nuk u gjet');
    },

    getFileInfo(filename) {
        const filePath = path.join(filesDir, filename);
        if (!fs.existsSync(filePath)) throw new Error('File nuk u gjet');
        const stats = fs.statSync(filePath);
        return {
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime
    };
  },
};