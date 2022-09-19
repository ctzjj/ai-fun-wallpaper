<template>
    <el-row>
        <el-col :span="8" v-for="(imageInfo, index) in imageList" :key="index">
            <el-card :body-style="{ padding: '0' }" shadow="never">
                <Photo :imageInfo.sync="imageInfo" />
            </el-card>
        </el-col>
        <el-col v-if="isLoading" :span="24" class="loading"
                v-loading="isLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"></el-col>
        <el-col v-if="isNoMore" :span="24" class="empty">
            没有更多了
        </el-col>
    </el-row>
</template>

<script>
    import {Row, Col, Card} from 'element-ui';
    import Photo from "./Photo";
    export default {
        name: "List",
        components: {
            [Row.name] : Row,
            [Col.name] : Col,
            [Card.name] : Card,
            Photo
        },
        props: {
            loadTimes: {
                type: [Number, String],
                default: 0
            }
        },
        data () {
            return {
                imageList: [],
                pageNo:1,
                isLoading: true,
                isNoMore: false
            }
        },
        computed: {
            platform() {
                return this.$store.state.platform;
            },
            cid() {
                return this.$store.state.cid;
            }
        },
        watch: {
            'platform' : async function (oldVal, newVal) {
                if (oldVal === newVal) return true;
                this.isLoading = true;
                this.isNoMore = false;
                this.imageList = [];
                this.pageNo = 1;
                this.imageList = await this.getImageList();
            },
            'cid': async function (oldVal, newVal) {
                if (oldVal === newVal) return true;
                this.isLoading = true;
                this.isNoMore = false;
                this.imageList = [];
                this.pageNo = 1;
                this.imageList = await this.getImageList();
            },
            loadTimes: async function () {
                await this.load();
            }
        },
        methods: {
            load() {
                this.pageNo++;
                this.getImageList().then((data) => {
                    if (data.length === 0) {
                        this.isNoMore = true;
                        this.isLoading = false;
                    }
                    this.imageList = this.imageList.concat(data);
                });
            },
            async getImageList() {
                let dataSource = window.Source.getSource(this.platform);
                return await dataSource.getList(this.pageNo, this.cid);

            },
            async initPage() {
                this.imageList = [];
                this.imageList = await this.getImageList();
            }
        },
        mounted() {
            this.initPage()
        }
    }
</script>

<style scoped>
    .loading {
        height: 60px;
    }
    .empty {
        color: #4c8dff;
        line-height: 60px;
        text-align: center;
        height: 60px;
    }
</style>
