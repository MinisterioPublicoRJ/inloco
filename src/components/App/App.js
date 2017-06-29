import React from 'react'
import ReactDOM from 'react-dom'
import logger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import appReducer from './appReducer.js'
import { Provider } from 'react-redux'
import LeafletMapContainer from '../LeafletMap/LeafletMapContainer.js'
import SidebarLeftContainer from '../SidebarLeft/SidebarLeftContainer.js'
import SidebarRightContainer from '../SidebarRight/SidebarRightContainer.js'
import HeaderContainer from '../Header/HeaderContainer.js'
import ExampleHighcharts from '../Charts/ExampleHighcharts.js'
import GeoAPI from '../Api/GeoAPI.js'
import TooltipContainer from '../Tooltip/TooltipContainer.js'
import { populateApp } from '../../actions/actions.js'

require('./app.scss')

const store = createStore(appReducer, applyMiddleware(logger))

/**
 * Define a call back for app population after XML Data is loaded
 * @param {Object} xmlData data returned by GeoServer API
 */
const ajaxCallback = (xmlData) => {
    store.dispatch(populateApp(xmlData))
}

// call backend data load passing created callback
GeoAPI.getContent(ajaxCallback)


/**
 * Define an ordering function by layer order parameter
 * @param {Object[]} layers Array of layers objects
 * @return {Function} sort function
 */
const orderByLayerOrder = (layers) => {
    return layers.sort(function(a, b) {
        return a.order - b.order
    })
}

/**
 * Returns a JSX string with the app content
 * @return {String} JSX markup with the components
 */
const App = () => {
    return (
         <Provider store={store}>
            <div className="module-app">
                <HeaderContainer/>
                <TooltipContainer/>
                <SidebarLeftContainer/>
                <SidebarRightContainer orderByLayerOrder={orderByLayerOrder}/>
                <LeafletMapContainer orderByLayerOrder={orderByLayerOrder}/>
            </div>
        </Provider>
    )
}

ReactDOM.render(
    <App/>, document.getElementById('app')
)
