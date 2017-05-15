import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import appReducer from './appReducer.js';
import { Provider } from 'react-redux';
import LeafletMap from '../LeafletMap/LeafletMap.js';
import MenuContainer from '../Menu/MenuContainer.js';
import ExampleHighcharts from '../Charts/ExampleHighcharts.js';
import GeoAPI from '../Api/GeoAPI.js';

require('./app.scss');

const store = createStore(appReducer);

const menuCallback = (data) => {
    store.dispatch({
        type: 'POPULATE_MENU',
        data: data
    });
};

const menu = GeoAPI.getContent(menuCallback);

const App = () => {
    return (
         <Provider store={store}>
            <div className="module-app">
                <MenuContainer/>
                <LeafletMap/>
            </div>
        </Provider>
    );
}

ReactDOM.render(
    <App/>, document.getElementById('app')
);
