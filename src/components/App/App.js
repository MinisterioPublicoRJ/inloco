import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
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

ReactGA.initialize('UA-80844385-5');

function logPageView() {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
}

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
        tooltip: 'Baixar',
        className: 'fa fa-download download',
    },
    {
        name: 'share',
        tooltip: 'Compartilhar',
        className: 'fa fa-share-alt share',
    },
    {
        name: 'draw',
        tooltip: 'Desenhar',
        className: 'fa fa-pencil draw',
    },
    {
        name: 'polygonRequest',
        tooltip: 'Busca por desenho',
        className: 'fa fa-pencil-square-o polygonRequest',
    },
    {
        name: 'search',
        tooltip: 'Filtro por área',
        className: 'fa fa-search search',
    },
    {
        name: 'help',
        tooltip: 'Ajuda',
        className: 'fa fa-question help',
    },
]
const mapItems = [
    {
        name: "basemaps",
        tooltip: 'Camadas de fundo',
        className: "fa fa-map basemaps"
    },
    {
        name: "searchStreet",
        tooltip: 'Busca de ruas/pontos de interesse',
        className: "fa fa-binoculars searchStreet"
    },
    {
        name: "streetView",
        tooltip: 'Street View™',
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
                <ToolbarContainer orderByLayerOrder={orderByLayerOrder} items={platformItems} type="platform"/>
                <ToolbarContainer items={mapItems} type="map"/>
                <ModalContainer newsModal={newsModal}/>
            </div>
        </Provider>
    )
}

ReactDOM.render(
    <App/>, document.getElementById('app')
)

logPageView()
