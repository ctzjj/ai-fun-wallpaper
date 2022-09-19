class Source {
    constructor () {}

    /**
     * 获取分类列表
     */
    getCategoryList() {}

    /**
     * 获取图片列表
     * @returns {Promise<ImageModelList>}
     */
    async getList() {}

    /**
     * 获取分页大小
     */
    getPageSize() {}

    /**
     * 获取来源信息
     */
    getPlatformInfo() {}
}

module.exports = Source;
