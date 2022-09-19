<template>
    <el-drawer title="设置" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
        <el-row class="drawer-box">
            <el-col :md="24">
                <p>保存位置</p>
            </el-col>
            <el-col :md="24">
                <p>{{downloadPath}}</p>
                <el-button size="mini" @click.stop.prevent="changeDownloadPath">选择下载目录</el-button>
            </el-col>
        </el-row>
    </el-drawer>
</template>

<script>
    import {Drawer, Row, Col, Button} from 'element-ui';
    export default {
        name: "Setting",
        components: {
            [Drawer.name] : Drawer,
            [Row.name] : Row,
            [Col.name] : Col,
            [Button.name] : Button,
        },
        data() {
            return {
                drawer: this.isShowDrawer,
                direction: 'rtl',
                downloadPath : ''
            };
        },
        props: {
            isShowDrawer: {
                type: [Boolean],
                default: false,
                required: true
            }
        },
        watch: {
            isShowDrawer: function () {
                this.drawer = this.isShowDrawer;
            }
        },
        methods: {
            handleClose(done) {
                this.$emit('update:isShowDrawer', false);
                done();
            },
            changeDownloadPath() {
                let dir = window.Elec.showOpenDialogSync(this.window, {
                    properties: ['openDirectory']
                });
                if (!dir || !dir[0] || dir[0].length <= 0) {
                    return 0;
                }
                this.downloadPath = dir[0];
                window.Utils.Config.setDownloadPath(dir[0]);
            }
        },
        mounted() {
            this.downloadPath = window.Utils.Config.getDownloadPath();
        }
    }
</script>

<style scoped>
    .drawer-box {
        text-align: left;
        padding: 15px;
    }
</style>