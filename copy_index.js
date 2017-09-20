var cpx = require('cpx')

console.log('Copying Index file...')
cpx.copySync('public/index.html', 'static/')
console.log('OK')
