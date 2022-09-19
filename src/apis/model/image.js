class Image {
    constructor() {
        this.id = '';
        this.url = '';
        this.desc = '';
        this.date = '';
        this.hot = '';
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setUrl (url) {
        this.url = url;
        return this;
    }

    setDesc (desc) {
        this.desc = desc;
        return this;
    }

    setDate (date) {
        this.date = date;
        return this;
    }

    setHot (hot) {
        this.hot = hot;
        return this;
    }
}

module.exports = Image;
