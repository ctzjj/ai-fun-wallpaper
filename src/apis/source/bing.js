/**
 * 必应壁纸
 * @type {ImageInfo}
 */
const Abstract = require('../abstract/source');
const ImageInfo = require('../model/image');
const uuid = require('uuid');
const axios = require('axios');

class Bing extends Abstract {

    constructor() {
        super();
        this.pageSize = 12;
        this.categoryList = [
            {
                "cid" : "",
                "name" : "每日精选"
            },
        ]
    }

    getCategoryList() {
        return this.categoryList;
    }

    getHeaders() {
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'bing.ioliu.cn',
            'Referer': 'https://bing.ioliu.cn/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
        }
    }

    async getHtml (pageNo) {
        let url = `https://bing.ioliu.cn/?p=${pageNo}`;
        let headers = this.getHeaders();

        let resp = await axios.get(url, {
            headers: this.getHeaders()
        });

        return {'body': resp.data};
    }

    async getList(pageNo = 1, cid = '') {
        let imageList = [];
        let result = await this.getHtml(pageNo);
        if (result.body.length <= 0) {
            return {};
        }
        let html = result.body;
        let reg = /<div[^<>]*class="item">[\s\S]*?class="options">[\s\S]*?<\/div>/ig;
        let matched = html.match(reg);
        if (!matched) {
            return [];
        }

        for ( let i in matched) {
            let imgInfo = new ImageInfo();
            let imgUrl = /<img[^<>]*src="([^<>]*)"/i.exec(matched[i]);
            let desc = /description[^<>]*>\s*<h3>([^<>]*)<\/h3>/i.exec(matched[i]);
            if (desc && desc[1].length >= 0) {
                imgInfo.setDesc(desc[1]);
            }
            let date = /calendar[\s\S]*?<em[^<>]*class="t"[^<>]*>([^<>]*?)<\/em>/i.exec(matched[i]);
            if (date && date[1].length >= 0) {
                imgInfo.setDate(date[1]);
            }
            let hot = /view[\s\S]*?<em[^<>]*class="t"[^<>]*>([^<>]*?)<\/em>/i.exec(matched[i]);
            if (hot && hot[1].length >= 0) {
                imgInfo.setHot(hot[1]);
            }
            if (!imgUrl || imgUrl[1].length <= 0) {
                continue;
            }
            imgInfo.setUrl(imgUrl[1].replace(/_\d+x\d+/, '_1920x1080'));
            imgInfo.setId(uuid.v1());
            imageList.push(imgInfo)
        }
        return imageList;

    }

    getPageSize() {
        return this.pageSize;
    }

    getPlatformInfo() {
        return {
            'name' : '必应壁纸',
            'code' : 'bing',
            'link' : 'https://bing.ioliu.cn/',
            'proxy': false
        };
    }
}

module.exports = Bing;
