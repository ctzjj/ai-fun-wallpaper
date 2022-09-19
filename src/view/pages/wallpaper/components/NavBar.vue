<template>
    <el-row class="nav">
        <el-col :span="24" class="logo">
            <el-menu mode="horizontal" :default-active="name" class="menu" @select="selectCategory">
                <el-menu-item v-for="(category, index) in categoryGroup.main" :key="index" :index="`main-${index}`" class="category-item">
                    {{category.name}}
                </el-menu-item>
                <el-submenu index="sub" v-if="(categoryGroup.sub.length > 0)" class="category-item">
                    <template slot="title">更多</template>
                    <el-menu-item v-for="(cate, idx) in categoryGroup.sub" :key="idx" :index="`sub-${idx}`">{{cate.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    import {Row, Col, Menu, MenuItem, Submenu, Icon} from 'element-ui';
    export default {
        name: "NavBar",
        components: {
            [Row.name] : Row,
            [Col.name] : Col,
            [Menu.name] : Menu,
            [MenuItem.name] : MenuItem,
            [Submenu.name]: Submenu,
            [Icon.name] : Icon,
        },
        data () {
            return {
                categories: [],
                name: 'main-0'
            }
        },
        computed: {
            platform() {
                return this.$store.state.platform;
            },
            categoryGroup() {
                let main = [];
                let sub = [];
                for (let i in this.categories) {
                    if (i > 10) {
                        sub.push(this.categories[i]);
                    } else {
                        main.push(this.categories[i]);
                    }
                }

                let group = {};
                group['main'] = main;
                group['sub'] = sub;
                return group;
            }
        },
        watch: {
            'platform' : function (oldVal, newVal) {
                if (oldVal === newVal) return true;
                this.getCategoryList();
            }
        },
        methods: {
            async getCategoryList() {
                let dataSource = window.Source.getSource(this.platform);
                this.categories = await dataSource.getCategoryList();
            },
            selectCategory(index) {
                if (index === this.name) return true;
                this.name = index;
                let [group, idx] = index.split('-');
                let categories = this.categoryGroup[group];
                let category = categories[idx];
                this.$store.commit('cidChange', category.cid)
            }
        },
        mounted() {
            this.getCategoryList()
        }
    }
</script>

<style scoped>
    /deep/ .el-menu{
        background-color: #495A80;
    }
    .el-menu--horizontal>.el-menu-item {
        color: #f2f2f2;
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
        outline: 0;
        color: #f2f2f2;
    }
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu /deep/ .el-submenu__title:hover {
        outline: 0;
        background-color: rgba(48, 49, 51, 0);
    }
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-submenu /deep/ .el-submenu__title:focus {
        background-color: rgba(48, 49, 51, 0);
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus{
        outline: 0;
        color: #ffffff;
    }
    .el-menu--horizontal>.el-menu-item {
        height: 50px;
        line-height: 50px;
    }
    .el-menu--horizontal>.el-submenu {
        height: 50px;
        line-height: 50px;
    }
    .el-menu--horizontal>.el-submenu /deep/ .el-submenu__title {
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid transparent;
        color: #f2f2f2;
    }
    /deep/ .el-submenu__title i {
        color: #f2f2f2;
    }
    .el-menu--horizontal>.el-submenu.is-active /deep/ .el-submenu__title {
        border-bottom: 2px solid #409eff;
    }
    .el-menu .el-menu--popup {
        display: flex;
        position: fixed;
        left: 0;
        width: 100%;
    }
    .nav {

    }
    .logo {
        padding-left: 5px;
        text-align: left;
        font-size: 20px;
        color: bisque;
        font-weight: bold;
    }
    .category {
        text-align: left;
        -webkit-app-region: no-drag;
    }
    .category .menu {
        height: 40px;
        line-height: 40px;
        background: rgba(0,0,0,0);
    }
    .category-item {
        width: 8%;
        text-align: center;
    }
</style>
