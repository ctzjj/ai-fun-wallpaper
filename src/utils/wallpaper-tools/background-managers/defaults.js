const wallpaper = require('wallpaper');

exports.isAvailable = async () => { return true }

exports.set = async (imagePath) => {
    return await wallpaper.set(imagePath);
};

exports.get = async () => {
	return await wallpaper.get();
};