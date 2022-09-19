
const path = require('path');
const deepin20 = require('./background-managers/deepin20');
const defaults = require('./background-managers/defaults');

let managers = [deepin20, defaults]
let availableApps;

async function setAvailableApps() {
	availableApps = [];

	const promises = managers.map(async manager => {
		if (await manager.isAvailable()) {
			availableApps.push(manager);
		}
	});

	await Promise.all(promises);
}

exports.set = async imagePath => {
	if (typeof imagePath !== 'string') {
		throw new TypeError('Expected a string');
	}

	if (!availableApps) {
		await setAvailableApps();
		await exports.set(imagePath);
		return;
	}

	const promises = availableApps.map(async app => {
		if (typeof app.set === 'function') {
			await app.set(path.resolve(imagePath));
		}
	});

	await Promise.all(promises.map(promise => promise.catch(() => {})));
};