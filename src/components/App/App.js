import React from 'react'
import ReactDOM from 'react-dom'
import logger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { populateApp, populatePlaces, startPopulateApp } from '../../actions/actions.js'
import appReducer from './appReducer.js'
import GeoAPI from '../Api/GeoAPI.js'
import HeaderContainer from '../Header/HeaderContainer.js'
import HeaderRightContainer from '../HeaderRight/HeaderRightContainer.js'
import HelpContainer from '../Help/HelpContainer.js'
import LeafletMapContainer from '../LeafletMap/LeafletMapContainer.js'
import LoadingContainer from '../Loading/LoadingContainer.js'
import ModalContainer from '../Modal/ModalContainer.js'
import SidebarLeftContainer from '../SidebarLeft/SidebarLeftContainer.js'
import SidebarRightContainer from '../SidebarRight/SidebarRightContainer.js'
import ToolbarContainer from '../Toolbar/ToolbarContainer.js'
import TooltipContainer from '../Tooltip/TooltipContainer.js'

require('./app.scss')

// start by removing pre-loading
document.getElementById('pre-loading').remove()

const store = createStore(appReducer, applyMiddleware(logger))

const ajaxCallback = (xmlData) => {
    store.dispatch(populateApp(xmlData, location.hash))
};
GeoAPI.getContent(ajaxCallback)

const placesCallback = (xmlData) => {
    store.dispatch(populatePlaces(xmlData))
}

const orderByLayerOrder = (layers) => {
    return layers.sort(function(a, b) {
        return a.order - b.order
    })
}

let newsModal

// Toolbars (order is RTL)
const platformItems = [
    {
        name: 'about',
        className: 'fa fa-info about',
    },
    {
        name: 'download',
        className: 'fa fa-download download',
    },
    {
        name: 'share',
        className: 'fa fa-share-alt share',
    },
    {
        name: 'draw',
        className: 'fa fa-pencil draw',
    },
    {
        name: 'polygonRequest',
        className: 'fa fa-pencil-square-o polygonRequest',
    },
    {
        name: 'search',
        className: 'fa fa-search search',
    },
    {
        name: 'help',
        className: 'fa fa-question help',
    },
]
const mapItems = [
    {
        name: "basemaps",
        className: "fa fa-map basemaps"
    },
    {
        name: "searchStreet",
        className: "fa fa-binoculars searchStreet"
    },
    {
        name: "streetView",
        className: "fa fa-street-view streetView"
    },
]

const App = () => {
    return (
         <Provider store={store}>
            <div className="module-app">
                <LoadingContainer/>
                <HeaderContainer/>
                <HeaderRightContainer/>
                <HelpContainer/>
                <TooltipContainer/>
                <SidebarLeftContainer/>
                <SidebarRightContainer orderByLayerOrder={orderByLayerOrder}/>
                <LeafletMapContainer orderByLayerOrder={orderByLayerOrder}/>
                <ToolbarContainer items={platformItems} type="platform"/>
                <ToolbarContainer items={mapItems} type="map"/>
                <ModalContainer newsModal={newsModal}/>
            </div>
        </Provider>
    )
}

ReactDOM.render(
    <App/>, document.getElementById('app')
)
