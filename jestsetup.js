// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

// Fail tests on any warning
console.error = message => {
    throw new Error(message);
};