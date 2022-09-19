/**
 * 小鸟壁纸
 * @type {ImageInfo}
 */
const Abstract = require('../abstract/source');
const ImageInfo = require('../model/image');
const uuid = require('uuid');
const axios = require('axios');

class XiaoNiao extends Abstract {

    constructor () {
        super();
        this.pageSize = 10;
        this.categoryList = [
            {
                "cid" : "",
                "name" : "最新"
            },
            {
                "cid" : "36",
                "name" : "4K"
            },
            {
                "cid" : "30",
                "name" : "爱情"
            },
            {
                "cid" : "6",
                "name" : "美女"
            },
            {
                "cid" : "9",
                "name" : "风景"
            },
            {
                "cid" : "15",
                "name" : "小清新"
            },
            {
                "cid" : "26",
                "name" : "动漫"
            },
            {
                "cid" : "11",
                "name" : "明星"
            },
            {
                "cid" : "14",
                "name" : "萌宠"
            },
            {
                "cid" : "5",
                "name" : "游戏"
            },
            {
                "cid" : "12",
                "name" : "汽车"
            },
            {
                "cid" : "10",
                "name" : "炫酷"
            },
            {
                "cid" : "7",
                "name" : "剧照"
            },
            {
                "cid" : "22",
                "name" : "军事"
            },
            {
                "cid" : "18",
                "name" : "baby秀"
            },
            {
                "cid" : "29",
                "name" : "月历"
            },
            {
                "cid" : "13",
                "name" : "节日"
            },
            {
                "cid" : "16",
                "name" : "体育"
            },
            {
                "cid" : "35",
                "name" : "文字控"
            },
        ]
    }


    getCategoryList() {
        return this.categoryList;
    }

    getHeaders() {
        return {
            'Accept': 'application/json, text/plain, */*',
            'Referer': 'http://front.birdpaper.com.cn/?appver=3.1119.1175.1120&smallui=0&pid=bizhi_home&mid=eecb24e7dedeb4e637ed7308a28da0fb&mid2=af558c9f24f6825a35e263d490daa81cd90b96742b0d',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36'
        }
    }

    async getJson (pageNo = 1, cid = '') {
        let url = `http://wp.birdpaper.com.cn/intf/newestList?pageno=${pageNo}&count=${this.pageSize}`;
        if(cid.length > 0) {
            url = `http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=${cid}&pageno=${pageNo}&count=${this.pageSize}`;
        }

        let resp = await axios.get(url, {
            headers: this.getHeaders()
        });
        return {'body': resp.data};
    }

    async getList(pageNo = 1, cid = '') {
        let imageList = [];
        let result = await this.getJson(pageNo, cid);
        if (Object.keys(result.body).length <= 0) {
            return {};
        }
        let imageInfoListDate = result.body;
        if(!imageInfoListDate.hasOwnProperty('data')) {
            return new ImageInfo();
        }

        let imageListData = imageInfoListDate['data'];
        if(!imageListData.hasOwnProperty('list')) {
            return new ImageInfo();
        }

        let images = imageListData['list'];
        if (images.length <= 0) {
            return [];
        }

        for (let i in images) {
            let image = new ImageInfo();
            image.setUrl(images[i]['url'])
                .setDesc(images[i]['tag'])
                .setDate(images[i]['create_time'])
                .setId(uuid.v1());
            imageList.push(image);
        }
        return imageList;
    }

    getPageSize() {
        return this.pageSize;
    }

    getPlatformInfo() {
        return {
            'name' : '小鸟壁纸',
            'code' : 'xiaoniao',
            'link' : 'http://bizhi.360.cn/',
            'proxy': false
        };
    }
}

module.exports = XiaoNiao;
