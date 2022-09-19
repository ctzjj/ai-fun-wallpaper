<template>
    <el-dialog title="关于" :visible.sync="isShow" width="35%" :before-close="handleClose">
        <div>
            <div class="items">
                <div class="name">软件名称：</div>
                <div class="value">爱换壁纸</div>
            </div>
            <div class="items">
                <div class="name">当前版本：</div>
                <div class="value">{{packageInfo.version}}</div>
            </div>
            <div class="items">
                <div class="name">项目地址：</div>
                <div class="value">
                    <a href="javascript:;" @click.stop.prevent="openHomePage('gitee')">gitee</a>
                </div>
            </div>
            <div class="items">
                <div class="name">QQ交流群：</div>
                <div class="value">
                    <span>56422506</span> | <span>暗号：afw</span>
                </div>
            </div>
            <div class="items">
                <span class="tips">本软件仅供学习交流使用，请勿商用，软件使用的数据均来自互联网。</span>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import packageInfo from "../../../../../package.json";
    import {Dialog} from 'element-ui';
    export default {
        name: "About",
        components: {
            [Dialog.name] : Dialog,
        },
        props: {
            isShowAbout: {
                type: [Boolean],
                default: false,
                required: true
            }
        },
        data () {
            return {
                packageInfo,
                isShow: this.isShowAbout
            }
        },
        methods: {
            handleClose(done) {
                this.$emit('update:isShowAbout', false);
                done();
            },
            openHomePage() {
                let url = 'https://gitee.com/ctzjj/ai-fun-wallpaper';
                window.Elec.openExternal(url);
            }
        },
        watch: {
            isShowAbout: function () {
                this.isShow = this.isShowAbout;
            }
        }
    }
</script>

<style scoped>
    .items {
        margin-top: 5px;
    }
    .items .name {
        width: 30%;
        display: inline;
        text-align: right;
    }
    .items .value {
        width: 70%;
        display: inline;
        text-align: left;
    }
    .items .tips {
        color: coral;
    }
</style>
