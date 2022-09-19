const axios = require('axios');
const btoa = require('btoa');

class Proxy {
    async image (url, headers = []) {
        let resp = await axios({
            url: url,
            method: "GET",
            headers: headers,
            responseType:'arraybuffer',
        });
        let base64Data = btoa(
            new Uint8Array(resp.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return `data:image/jpg;base64,${base64Data}`;
    }

}
module.exports = Proxy;
