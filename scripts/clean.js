const sh = require('shelljs');
const upath = require('upath');

const destPath = upath.resolve(upath.dirname(__filename), '../dist');

sh.rm('-rf', `${destPath}/*`)
sh.rm('-rf', `${destPath}/js/*.js`)
sh.rm('-rf', `${destPath}/css/*.css`)
