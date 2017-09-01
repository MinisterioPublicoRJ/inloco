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
import HeaderRightContainer from '../HeaderRight/HeaderRightContainer.js'
import ExampleHighcharts from '../Charts/ExampleHighcharts.js'
import GeoAPI from '../Api/GeoAPI.js'
import TooltipContainer from '../Tooltip/TooltipContainer.js'
import ToolbarContainer from '../Toolbar/ToolbarContainer.js'
import { populateApp, populatePlaces } from '../../actions/actions.js'
import ModalContainer from '../Modal/ModalContainer.js'

require('./app.scss')

// order is RTL
const platformItems = [
    {
        name: "download",
        className: "fa fa-download",
    },
    {
        name: "share",
        className: "fa fa-share-alt",
    },
    {
        name: "draw",
        className: "fa fa-pencil",
    },
    {
        name: "polygonRequest",
        className: "fa fa-square-o",
    },
    {
        name: "search",
        className: "fa fa-search",
    },
]

const mapItems = [
    {   name: "basemaps",
        className: "fa fa-map"
    },
    {   name: "searchStreet",
        className: "fa fa-binoculars"
    },
    {
        name: "streetView",
        className: "fa fa-street-view"
    },
]

const store = createStore(appReducer, applyMiddleware(logger))

const ajaxCallback = (xmlData) => {
    store.dispatch(populateApp(xmlData, location.hash))
};
GeoAPI.getContent(ajaxCallback)

const placesCallback = (xmlData) => {
    store.dispatch(populatePlaces(xmlData))
};
//GeoAPI.getPlaces(placesCallback)

const orderByLayerOrder = (layers) => {
    return layers.sort(function(a, b) {
        return a.order - b.order
    })
}

const App = () => {
    return (
         <Provider store={store}>
            <div className="module-app">
                <HeaderContainer/>
                <HeaderRightContainer/>
                <TooltipContainer/>
                <SidebarLeftContainer/>
                <SidebarRightContainer orderByLayerOrder={orderByLayerOrder}/>
                <LeafletMapContainer orderByLayerOrder={orderByLayerOrder}/>
                <ToolbarContainer items={platformItems} type="platform"/>
                <ToolbarContainer items={mapItems} type="map"/>
                <ModalContainer/>
            </div>
        </Provider>
    )
}

ReactDOM.render(
    <App/>, document.getElementById('app')
)
