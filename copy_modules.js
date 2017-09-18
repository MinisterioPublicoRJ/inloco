var mkdirp = require('mkdirp')
var copydir = require('copy-dir')

var folderFA = 'src/components/App/sass/font-awesome'
var folderLeaflet = 'src/components/App/sass/leaflet'

console.log('Copying Modules...')

mkdirp(folderFA)
copydir.sync('node_modules/font-awesome', folderFA)

mkdirp(folderLeaflet)
copydir.sync('node_modules/leaflet', folderLeaflet)

console.log('OK')
