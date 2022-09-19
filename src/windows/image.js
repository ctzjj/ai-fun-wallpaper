const { BrowserWindow, ipcMain, dialog, globalShortcut, Menu } = require('electron');
const path = require('path');

class DrawWindow {

    constructor() {
        this.window = null;
        this.isShow = false;
    }

    createWindow() {
        Menu.setApplicationMenu(null);
        this.window = new BrowserWindow({
            frame: false,
            width : 1200,
            height : 800,
            minWidth : 1024,
            minHeight : 768,
            show : false,
            webPreferences : {
                devTools : true,
                nodeIntegration : false,
                enableRemoteModule: true,
                preload: path.join(__dirname, '../preload/preload.js')
            }
        });

        if (process.env.NODE_ENV === 'dev') {
            this.window.loadURL(`http://127.0.0.1:8080`);
        } else {
            this.window.loadURL(`file://${__dirname}/../../dist/index.html`);
        }
    }

    show () {
        this.window.show();
        this.window.focus();
        this.isShow = true;
    }

    shortcut() {
        globalShortcut.register('CommandOrControl+Alt+D', () => {
            this.window.webContents.openDevTools()
        })
    }

    ipc () {
        ipcMain.on('select-download-dir', (event) => {
            let dir = dialog.showOpenDialogSync(this.window, {
                properties: ['openDirectory']
            });
            event.reply('select-download-dir-reply', dir);
        });
        ipcMain.on('window-min', () => this.window.minimize());
        ipcMain.on('window-max', () => {
            if (this.window.isMaximized()) {
                this.window.unmaximize()
            } else {
                this.window.maximize()
            }
        });
        ipcMain.on('window-close', () => this.window.close());
    }
}

module.exports = DrawWindow;
