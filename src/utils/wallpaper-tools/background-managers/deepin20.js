const {commandExists, execFile, exec} = require('../util');

exports.isAvailable = async () => {
	if (!await commandExists('dbus-send')) {
		return false;
	}
	if (!await commandExists('xrandr')) {
		return false;
	}
	if (!await commandExists('lsb_release')) {
		return false;
	}
	const {stdout} = await execFile(`lsb_release`, ['-a']);
	if (stdout.indexOf('Deepin 20') === -1) {
		return false;
	}
	return true;
};

exports.set = async imagePath => {
	const {stdout} = await execFile(`xrandr`);
	if (!stdout) {
		return false;
	}
	let lines = stdout.split(/\n/) || [];
	let displayName = null;
	lines.map((line) => {
		if (line.indexOf('connected primary') !== -1) {
			let items = line.split(' ') || [];
			displayName = items[0];
			return true;
		}
		
	});
	let cmd = `dbus-send --dest=com.deepin.daemon.Appearance /com/deepin/daemon/Appearance --print-reply com.deepin.daemon.Appearance.SetMonitorBackground string:"${displayName}" string:"file:///${imagePath}"`
	await exec(cmd);
};

exports.get = async () => {
	// TODO
	return '';
};
