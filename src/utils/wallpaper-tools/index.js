let wallpaper
if ((process.platform === 'darwin') || (process.platform === 'win32')) {
	wallpaper = require('wallpaper');
} else {
	wallpaper = require('./proxy');
}

module.exports = wallpaper