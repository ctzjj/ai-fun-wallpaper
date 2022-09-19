const electron = require('electron');
const path = require('path');
const { spawn } = require('child_process');


function startDevServer() {
    console.log('--------------start webpack dev server-----------------');
    return new Promise((resolve, reject) => {
        let cmd = process.platform === "win32" ? "vue-cli-service.cmd" : "vue-cli-service";
        let vueProcess = spawn(cmd, ['serve']);

        vueProcess.stdout.on('data', data => {
            if (data.toString().indexOf('successfully') !== -1) {
                resolve()
            }
        });
        vueProcess.stderr.on('data', data => {
            console.log(data.toString())
        });
        vueProcess.on('close', () => {
            process.exit()
        });
    });

}

function startElectron() {
    console.log('--------------start electron-----------------');
    let args = [
        '--inspect=5858',
        path.join(__dirname, '../src/main.js')
    ];

    let electronProcess = spawn(electron, args);

    electronProcess.stdout.on('data', data => {
        console.log(data.toString())
    });
    electronProcess.stderr.on('data', data => {
        console.log(data.toString())
    });
    electronProcess.on('close', () => {
        process.exit()
    });
}

console.log('%c ################ ai fun wallpaper #################', 'color:blue;');
startDevServer().then(() => {
    startElectron();
});