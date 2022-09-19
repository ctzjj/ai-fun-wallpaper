<template>
    <div class="title">
        <div class="mac" v-if="(platform === 'darwin')">
            <a href="#" class="close" @click="handleClose"></a>
            <a href="#" class="hide" @click="handleHide"></a>
            <a href="#" class="fullScreen" @click="handleFullScreen"></a>
        </div>
        <div class="linux" v-else>
            <a href="#" class="close" @click="handleClose">
                <i class="el-icon-close icon"></i>
            </a>
            <a href="#" class="fullScreen" @click="handleFullScreen">
                <i class="el-icon-full-screen icon"></i>
            </a>
            <a href="#" class="hide" @click="handleHide">
                <i class="el-icon-minus icon"></i>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TitleBar",
        data() {
            return {
                platform: window.platform
            }
        },
        methods: {
            handleClose() {
                document.dispatchEvent(new Event('window-close'));
            },
            handleHide() {
                document.dispatchEvent(new Event('window-min'));
            },
            handleFullScreen() {
                document.dispatchEvent(new Event('window-max'));
            }
        }
    }
</script>

<style scoped>
    .title {
        width: 100%;
        height: 22px;
        background-color: #364973ed;
        border-bottom:1px #5c6d94 solid;
        -webkit-app-region: drag;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .linux {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        flex-direction:row-reverse;
    }
    .linux a{
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        color: transparent;
    }
    .linux .icon {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
    }
    .linux .close {
        height: 22px;
        width: 22px;
        background-color: rgba(0, 0, 0, 0);
        -webkit-app-region: no-drag;
        font-size: 18px;
    }
    .linux .hide {
        height: 22px;
        width: 22px;
        background-color: #rgba(0, 0, 0, 0);
        -webkit-app-region: no-drag;
    }
    .linux .fullScreen {
        height: 22px;
        width: 22px;
        background-color: #rgba(0, 0, 0, 0);
        -webkit-app-region: no-drag;
    }
    .linux .fullScreen .icon{
        font-size: 14px;
    }
    .linux .icon:hover{
        background-color: #4668c9;
    }
    .linux .close .icon:hover{
        background-color: #ff4400;
    }
    .mac {
        margin-top: 5px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
    .mac .close {
        height: 14px;
        width: 14px;
        background-color: #f74544;
        border-radius: 50%;
        margin-left: 15px;
        -webkit-app-region: no-drag;
    }
    .mac .hide {
        height: 12px;
        width: 12px;
        background-color: #fbaf15;
        border-radius: 50%;
        margin-left: 10px;
        border: 1px solid #f1a304;
        -webkit-app-region: no-drag;
    }
    .mac .fullScreen {
        height: 12px;
        width: 12px;
        background-color: #38c228;
        border-radius: 50%;
        margin-left: 10px;
        border: 1px solid #32af24;
        -webkit-app-region: no-drag;
    }

</style>