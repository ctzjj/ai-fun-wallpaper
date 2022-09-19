const {remote, ipcRenderer, shell} = require('electron');

detectOs();

if (remote) {
    console.log('init preload');
    if (process.env.NODE_ENV === 'dev') {
        global.url = require('url');
    }

    global.DataSource = remote.app.DataSource;
    global.Utils = remote.app.Utils;
    global.Elec = {};
    global.Elec.showOpenDialogSync = remote.dialog.showOpenDialogSync;
    global.Elec.openExternal = shell.openExternal;
    global.Source = remote.app.Source;
    eventProxy();
}

function detectOs () {
    global.platform = process.platform;
}

function eventProxy() {
    document.addEventListener('window-close', () => {
        ipcRenderer.send('window-close');
    });
    document.addEventListener('window-min', () => {
        ipcRenderer.send('window-min');
    });
    document.addEventListener('window-max', () => {
        ipcRenderer.send('window-max');
    });
}
