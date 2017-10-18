var chalk = require('chalk')
var cpx = require('cpx')

console.log(chalk.blue('Copying static files...'))

try {
    cpx.copySync('public/index.html', 'static/')
    cpx.copySync('public/favicon.ico', 'static/')
    cpx.copySync('public/icon-apple-touch-57x57.jpg', 'static/')
    cpx.copySync('public/icon-apple-touch-72x72.jpg', 'static/')
    cpx.copySync('public/icon-apple-touch-114x114.jpg', 'static/')
    cpx.copySync('public/icon-apple-touch-144x144.jpg', 'static/')
    cpx.copySync('public/og-img.jpg', 'static/')

    console.log(chalk.green('Job done, moving on'))
} catch (e) {
    console.log(chalk.red('An error occured: \n' + e))
}
