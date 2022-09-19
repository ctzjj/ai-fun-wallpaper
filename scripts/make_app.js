const electron = require('electron');
const path = require('path');
const { spawn } = require('child_process');


function buildView() {
    console.log('--------------start webpack build view-----------------');
    return new Promise((resolve, reject) => {
        let vueProcess = spawn('vue-cli-service', ['build']);
        vueProcess.stdout.on('data', data => {
            console.log(data.toString())
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

function buildApp() {

}