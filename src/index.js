import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import Input from './components/input/Input.js';
import GeoAPI from './components/Api/GeoAPI.js';

GeoAPI.getContent();
//ReactDOM.render(<App menu={GeoAPI.menu} />, document.getElementById('app'));
