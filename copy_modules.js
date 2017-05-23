var mkdirp = require('mkdirp');
var copydir = require('copy-dir');

var folder = 'src/components/App/sass/font-awesome';

console.log('Copying Font Awesome...');

mkdirp(folder);
copydir.sync('node_modules/font-awesome', folder);

console.log('OK');
