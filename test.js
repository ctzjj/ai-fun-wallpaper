// const p = require('./src/utils/proxy');
const d = require('./src/utils/wallpaper');
// const d = require('./src/data_source/qihu_wallpaper');
//
// let da = new d();
//
// da.getList(1).then(e => {
//     console.log(e)
// })
let da = new d();
da.setWallpaper('/Users/ctzjj/aifun-wallpaper/0f1fa3503bcd64306d242337cecb87a4.jpg').then(function (e) {
    console.log(e)
});

//dbus-send --dest=com.deepin.daemon.Appearance /com/deepin/daemon/Appearance --print-reply com.deepin.daemon.Appearance.SetMonitorBackground string:HDMI-1 string:/home/ctzjj/aifun-wallpaper/1e15cfbf16df4d2ecdedb8e5457c29a4.jpg
// const a = require('./src/apis/factory');
//
// let c = new a();
//
// console.log(c.getPlatformMap());

// let proxy = new p();
// let headers = {
//     'Referer': "https://bing.ioliu.cn/",
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
// };
//
// let url = 'http://h1.ioliu.cn//bing/OberweissbacherBergbahn_ZH-CN1289048050_1920x1080.jpg';
// proxy.image(url, headers).then((r) => {
//     console.log(r)
// });
// let dl = new d();
// dl.download('http://h1.ioliu.cn//bing/OberweissbacherBergbahn_ZH-CN1289048050_1920x1080.jpg', './', headers);

