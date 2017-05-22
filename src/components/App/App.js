import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux';
import appReducer from './appReducer.js';
import { Provider } from 'react-redux';
import LeafletMap from '../LeafletMap/LeafletMap.js';
import SidebarLeft from '../SidebarLeft/SidebarLeft.js';
import ExampleHighcharts from '../Charts/ExampleHighcharts.js';
import GeoAPI from '../Api/GeoAPI.js';

require('./app.scss');

const store = createStore(appReducer, applyMiddleware(logger));

const ajaxCallback = (xmlData) => {
    store.dispatch({
        type: 'POPULATE_APP',
        xmlData: xmlData
    });
};
GeoAPI.getContent(ajaxCallback);

const App = () => {
    return (
         <Provider store={store}>
            <div className="module-app">
                <SidebarLeft/>
                <LeafletMap/>
            </div>
        </Provider>
    );
}

ReactDOM.render(
    <App/>, document.getElementById('app')
);
