const Store = require('electron-store');
const fs = require('fs');
const store = new Store();

class Config {

    getDownloadPath() {
        let path = store.get('downloadPath');
        if (path && (path.length > 0) && hasDir(path)) {
            return path;
        }
        let homeDir = process.env.HOME;
        if (process.platform === 'win32') {
            homeDir = process.env.USERPROFILE
        }
        path = `${homeDir}/aifun-wallpaper/`;
        mkDir(path);
        store.set('downloadPath', path);
        return path;
    }

    setDownloadPath(path) {
        if (!fs.statSync(path).isDirectory()) {
            throw '目录不存在！'
        }
        store.set('downloadPath', path);
        return path;
    }

}
module.exports = Config;

function hasDir(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (e) {
        return false;
    }
}

function mkDir(path) {
    try {
        fs.statSync(path)
    } catch (e) {
        fs.mkdirSync(path, '0777');
    }
}
