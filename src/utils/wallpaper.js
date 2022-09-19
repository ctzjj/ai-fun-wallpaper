const axios = require('axios');
const wallpaper = require('./wallpaper-tools/index');
const fs = require('fs');
const crypto = require('crypto');
const url = require('url');

class Wallpaper {
    /**
     *
     * @param imgUrl
     * @param savePath
     * @param headers
     * @param callback<receivedBytes, totalBytes, localPath>
     * @returns {Promise<unknown>}
     */
    async download(imgUrl, savePath, headers = {}) {
        headers = ( Object.keys(headers) > 0 ) ? headers : getRequestHeaders();
        let localPath = getImageFilePath(imgUrl, savePath);
        let req = await axios({
            method: 'get',
            headers: headers,
            url: imgUrl,
            responseType:'stream',
            onDownloadProgress: function (progressEvent) {
                // console.log(Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
                // if (typeof(callback) == 'function') {
                //     callback(progressEvent.loaded, progressEvent.total, localPath);
                // }
            },
        });
        let imageFile = fs.createWriteStream(localPath);
        req.data.pipe(imageFile);
        return new Promise((resolve, reject) => {
            imageFile.on("finish", () => {
                resolve({'localPath' : localPath});
            });
            imageFile.on("error", reject);
        });
    }

    /**
     *
     * @param localImagePath
     * @returns {Promise<void>}
     */
    async setWallpaper(localImagePath) {
        return await wallpaper.set(localImagePath);
    }
}
module.exports = Wallpaper;

function getUrlPathMd5(urlPath) {
    var parse = url.parse(urlPath);
    return crypto.createHash('md5').update(parse.pathname).digest('hex');
}

function getImageFilePath(urlPath, savePath) {
    savePath = savePath.replace(/([\s/\\]*$)/ig,"");
    let imageName = getUrlPathMd5(urlPath);
    return `${savePath}/${imageName}.jpg`;
}

function getRequestHeaders(option = {}) {
    let headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    };
    if (option['referer']) {
        headers['Referer'] = option['referer']
    }
    return headers;
}
