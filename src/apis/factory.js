const sourceList = require('require-all')({
    dirname : __dirname + '/source',
    resolve : function (source) {
        return new source();
    }
});

class Factory {
    constructor() {
        this.platformMap = {};
        this.sourceMap = {};
        this.needProxyPlatformList = [];
        this.initPlatforms();
    }
    initPlatforms() {
        for (let key in sourceList) {
            let platform = sourceList[key];
            let info = platform.getPlatformInfo();
            this.platformMap[info.code] = info;
            this.sourceMap[info.code] = platform;
            if (info.proxy) {
                this.needProxyPlatformList.push(info.code)
            }
        }
    }
    getPlatformMap() {
        return this.platformMap;
    }

    getNeedProxyPlatforms() {
        return this.needProxyPlatformList;
    }

    getSource(platform) {
        return this.sourceMap[platform] || {};
    }
}
module.exports = Factory;
