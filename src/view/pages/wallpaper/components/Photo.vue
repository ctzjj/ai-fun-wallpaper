<template>
    <div class="image-box">
        <el-image :src="imageInfo.imageData || imageInfo.url" class="image">
            <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
            </div>
        </el-image>
        <div class="image-info">
            <div class="left">
                <i class="el-icon-view"> {{imageInfo.hot || '-' }} </i>
                <i class="el-icon-date"> {{imageInfo.date  || '-' }}</i>
                <el-tooltip :content="imageInfo.desc" placement="top" :open-delay="800" v-if="imageInfo.desc" max-width="260">
                    <i class="el-icon-location-information"></i>
                </el-tooltip>
            </div>
            <div class="right" v-if="!isDownloading">
                <el-tooltip content="下载壁纸" placement="top" :open-delay="1500">
                    <i class="el-icon-download" @click="downloadImage(imageInfo.url)"></i>
                </el-tooltip>
                <el-tooltip content="设置壁纸" placement="top" :open-delay="1500">
                    <i class="el-icon-picture-outline-round" @click="setWallpaper(imageInfo.url)"></i>
                </el-tooltip>
            </div>
            <div class="right" v-else>
                <el-tooltip content="下载中。。。" placement="top" :open-delay="1500">
                    <i class="el-icon-loading"></i>
                </el-tooltip>
            </div>

        </div>
    </div>
</template>

<script>
    import {Icon, Tooltip, Image} from 'element-ui';
    export default {
        name: "ImageCard",
        components: {
            [Icon.name] : Icon,
            [Tooltip.name] : Tooltip,
            [Image.name] : Image,
        },
        props: {
            imageInfo: Object
        },
        data() {
            return {
                isDownloading: false
            }
        },
        computed: {
            platform() {
                return this.$store.state.platform;
            },
        },
        methods: {
            async downloadImage(url) {
                let imageInfo = await this.downloadImageByUrl(url);
                if (imageInfo.localPath) {
                    let option = {
                        title: "爱换壁纸",
                        body: "壁纸下载好了。",
                    };
                    let notify = new window.Notification(option.title, option);
                    notify.onclick = () => {
                        notify.close();
                    }
                }
            },
            async downloadImageByUrl(url) {
                this.isDownloading = true;
                let downloadPath = window.Utils.Config.getDownloadPath();
                // let callback = (receivedBytes, totalBytes, localPath) => {
                //     console.log(receivedBytes, totalBytes);
                //     //TODO 进度条
                // };
                let headers = window.Source.getSource(this.platform).getHeaders();
                let image =  await window.Utils.Wallpaper.download(url, downloadPath, headers);
                this.isDownloading = false;
                return image;
            },
            async setWallpaper(url) {
                let imageInfo = await this.downloadImageByUrl(url);
                this.isDownloading = true;
                if (imageInfo.localPath.length <= 0) {
                    let option = {
                        title: "爱换壁纸",
                        body: "更换壁纸失败了。",
                    };
                    let notify = new window.Notification(option.title, option);
                    notify.onclick = () => {
                        notify.close();
                    }
                }
                await window.Utils.Wallpaper.setWallpaper(imageInfo.localPath);
                let option = {
                    title: "爱换壁纸",
                    body: "壁纸已经帮你好啦。",
                };
                let notify = new window.Notification(option.title, option);
                notify.onclick = () => {
                    notify.close();
                }
                this.isDownloading = false;
            },
        }
    }
</script>

<style scoped>
    .image-box {
        padding-bottom: 56%;
        width: 100%;
        position: relative;
    }
    .image-box .image {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .image-box:hover .image-info {
        display: block;
    }
    .image-info {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 52px;
        background: linear-gradient(to top, black, transparent);
        color: #dcdcdc;
        padding: 15px 5px 5px 5px;
        display: none;
    }
    .image-info .left {
        float: left;
        line-height: 65px;
        font-size: 20px;
        font-weight: bold;
    }
    .image-info .left i {
        margin-right: 5px;
    }
    .image-info .right {
        float: right;
        margin-right: 15px;
        line-height: 65px;
        font-size: 20px;
        font-weight: bold;
    }
    .image-info .right /deep/ i {
        margin-left: 10px;
        cursor: pointer;
    }
    /deep/ .image-slot{
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        height:100%;
        background:#f5f7fa;
        color:#909399;
        font-size:14px
    }
</style>
