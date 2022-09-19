<template>
    <el-container>
        <TitleBar />
        <el-header class="header">
            <NavBar />
        </el-header>
        <el-main class="main" v-infinite-scroll="load" infinite-scroll-distance="380" infinite-scroll-delay="200">
            <List :load-times.sync="times"/>
        </el-main>
        <el-footer class="footer">
            <Bottom />
        </el-footer>
    </el-container>
</template>

<script>
    import {Container, Header, Main, Footer} from 'element-ui';
    import TitleBar from "../components/TitleBar";
    import NavBar from "./components/NavBar";
    import List from "./components/List";
    import Bottom from "./components/Bottom";
    export default {
        name: "index",
        components: {
            [Container.name] : Container,
            [Header.name] : Header,
            [Main.name] : Main,
            [Footer.name] : Footer,
            TitleBar,
            NavBar,
            List,
            Bottom
        },
        data() {
            return {
                times: 0,
            }
        },
        methods: {
            load() {
                this.times++;
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-main {
        padding: 0;
    }
    .header {
        height: 50px !important;
        background-color: #495A80;
        color: #333;
        text-align: center;
        line-height: 39px;
        padding: 0;
        position: relative;
    }
    .main {
        overflow-y: scroll;
        height: calc(100vh - 100px);
    }
    .footer {
        height: 25px !important;
        padding: 0;
        line-height: 25px;
    }
</style>
