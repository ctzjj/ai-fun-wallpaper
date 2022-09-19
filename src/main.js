const { app, globalShortcut } = require('electron');
const imageWindow = require('./windows/image');
const Wallpaper = require('./utils/wallpaper');
const Source = require('../src/apis/factory');
const Proxy = require('./utils/proxy');
const Config = require('./utils/config');
app.disableHardwareAcceleration();

class AFWallpaper {

    constructor () {
        this.window = null;
        this.singleInstance();
        this.initApp();
        this.initRemote();
    }

    singleInstance () {
        const gotTheLock = app.requestSingleInstanceLock();
        if (!gotTheLock) {
            console.error('Other Instance Running');
            app.quit();
        }
    }

    initApp () {
        app.on('ready', () => {
            this.createWindow();
        });
        app.on('activate', () => {
            if (!this.window) {
                this.createWindow();
            } else {
                this.window.show()
            }
        });
        app.on('window-all-closed', () => {
            globalShortcut.unregisterAll();
            app.quit()
        });
    }

    initRemote() {
        app.Utils = {};
        app.Utils.Wallpaper = new Wallpaper();
        app.Utils.Config = new Config();
        app.Utils.Proxy = new Proxy();
        app.Source = new Source();
    }

    createWindow () {
        this.window = new imageWindow();
        this.window.createWindow();
        this.window.ipc();
        this.window.shortcut();
        this.window.show();
    }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

new AFWallpaper();
