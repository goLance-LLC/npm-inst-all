const path =  require('path');
const find = require('find');
const glob = require('glob')
const chalk = require('chalk');
const npm = require('./npm-wrapper');

const run = (opts) => {
	let dir = opts.cwd || path.resolve('.');
	if (dir.startsWith('.')) {
		dir = path.resolve(dir);
	}
	console.log(`Searching for all package.json in ${dir}`);

	const packages = [];

	return new Promise((resolve, reject) => {
		glob(`${dir}/**/*package.json`, {}, (err, files) => {
			if (err) {
				reject(err);
			}
			const targetPackages = files
				.filter(f => f.indexOf('node_modules') === -1)
				.filter(f => f.indexOf('bower_components') === -1)
				.map(f => path.resolve(dir, f));

			resolve(targetPackages);
		});
	}).then((packages) => {
		console.log(chalk.green(`Found ${packages.length} package${packages.length !== 1 ? 's' : ''}`));

		return packages.reduce((chain, packageJsonPath, i) => {
			const dirName = path.dirname(packageJsonPath);

			return chain.then(() => {
				console.log(chalk.bgGreen.white(`\n${i+1}/${packages.length} Installing dependencies in ${dirName}`));

				return npm.install({
					dir: dirName,
				});	
			});
		}, Promise.resolve());
	}).catch(err => console.error(err));
}	

module.exports = { run };