<template>
    <el-row class="button">
        <el-col :span="24">
            <div class="source-info">
                <span>当前壁纸来源：<a href="javascript:;" @click.stop.prevent="openPlatform">{{ this.platformName }}</a>
                    &nbsp;[
                    <el-dropdown @command="handleSwitchPlatform" placement="top-end">
                        <a href="javascript:void(0)">
                            切换
                            <i class="el-icon-arrow-up el-icon--right"></i>
                        </a>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(platformMap, index) in this.platformInfoMap" :key="index" :command="platformMap.code"
                                          :disabled="(platformMap.code === platform)" divided>
                                {{platformMap.name}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    ]
                </span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span><a href="javascript:;" @click="isShowDrawer = true">设置</a></span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span><a href="javascript:;" @click="isShowAbout = true">关于</a></span>
            </div>
        </el-col>
        <Setting :is-show-drawer.sync="isShowDrawer" />
        <About :is-show-about.sync="isShowAbout" />
    </el-row>

</template>

<script>
    import {Row, Col, Dropdown, DropdownMenu, DropdownItem, Icon} from 'element-ui';
    import About from "./About";
    import Setting from "../../components/Setting";
    export default {
        name: "Bottom",
        components: {
            [Row.name] : Row,
            [Col.name] : Col,
            [Dropdown.name] : Dropdown,
            [DropdownMenu.name] : DropdownMenu,
            [DropdownItem.name] : DropdownItem,
            [Icon.name] : Icon,
            About,
            Setting
        },
        data () {
            return {
                platformInfoMap: {},
                isShowAbout: false,
                isShowDrawer: false
            }
        },
        computed: {
            platform() {
                return this.$store.state.platform;
            },
            platformName() {
                return this.platformInfoMap[this.platform] && this.platformInfoMap[this.platform].name
            },
            platformLink() {
                return this.platformInfoMap[this.platform] && this.platformInfoMap[this.platform].link
            }
        },
        methods: {
          handleSwitchPlatform(platform){
              this.$store.commit('platformChange', platform)
          },
          openPlatform() {
              window.Elec.openExternal(this.platformLink)
          },
        },
        mounted() {
            this.platformInfoMap = window.Source.getPlatformMap();
        }
    }
</script>

<style scoped>
    .button {
        border-top: 1px solid #cecece;
        background-color: #ededed;
    }
    .source-info {
        margin-right: 10px;
        text-align: right;
        font-size: 12px;
    }
</style>
