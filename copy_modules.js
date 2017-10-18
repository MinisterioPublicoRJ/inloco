var chalk = require('chalk')
var mkdirp = require('mkdirp')
var copydir = require('copy-dir')
var copyFile = require('cpx')

var folderFA = 'src/components/App/sass/font-awesome'
var folderLeaflet = 'src/components/App/sass/leaflet'
var folderLeafletImages = 'src/components/App/sass/leaflet/images'

console.log(chalk.blue('Copying Modules...'))

try {
    mkdirp(folderFA)
    copydir.sync('node_modules/font-awesome', folderFA)

    mkdirp(folderLeaflet)
    copyFile.copySync('node_modules/leaflet/dist/leaflet.css', folderLeaflet)

    mkdirp(folderLeafletImages)
    copydir.sync('node_modules/leaflet/dist/images', folderLeafletImages)

    console.log(chalk.green('Job done, moving on'))
} catch (e) {
    console.log(chalk.red('An error occured: \n' + e))
}
