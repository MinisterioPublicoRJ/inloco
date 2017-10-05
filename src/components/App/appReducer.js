import geoServerXmlReducer from './reducers/geoServerXmlReducer'
import menuReducer from '../Menu/menuReducer'
import placesMock from './mocks/placesMock.json'
import BASE_MAPS_MOCK  from './mocks/baseMapsMock'

const CRAAI = "CRAAI"
const ESTADO_ID = "0"
const ENV_DEV = process.env.NODE_ENV === "mock"


const togglePlace = (place, id) => {
    if((place.id === id) && id !== ESTADO_ID){
        place.nodes.forEach((p) => {
            p.show = p.show ? !p.show : true
        })
        return place
    } else if (place.nodes.length > 0){
        var placeFound = null

        for(var i = 0; placeFound === null && i < place.nodes.length; i++){
            placeFound = togglePlace(place.nodes[i], id)
        }
        return placeFound
    }
    return null
}

const searchPlaceById = (place, id) => {
    if(place.id === id){
        return place
    } else if (place.nodes.length > 0){
        var placeFound = null

        for(var i = 0; placeFound === null && i < place.nodes.length; i++){
            placeFound = searchPlaceById(place.nodes[i], id)
        }
        return placeFound
    }
    return null
}
var resultPlaces = []
const searchPlaceByTitle = (place, text) => {
    if (place.title.toLowerCase().includes(text.toLowerCase()) && place.id !== ESTADO_ID && text !== "") {
        place.show = true
        return true
    } else if (place.id !== ESTADO_ID && place.tipo !== CRAAI) {
        place.show = false
    }
    if (place.nodes.length > 0) {
        var placeFound = null

        for (var i = 0; i < place.nodes.length; i++) {
            placeFound = searchPlaceByTitle(place.nodes[i], text)
            if (placeFound) {
                place.show = true
            }
        }
        if (place.show) {
            return true
        }
    }
    return null
}

const appReducer = (state = [], action) => {
    switch(action.type){
        case 'POPULATE_APP':
            // parse layers from GeoServer
            let layers = geoServerXmlReducer(action.xmlData.xmlData)
            let places = placesMock

            layers = layers.map(l => {
                return {
                    ...l,
                    selected: false,
                    match: true,
                    showDescription: false,
                    selectedLayerStyleId: 0,
                }
            })

            let menuItems = menuReducer(layers)
            menuItems = menuItems.map(m => {
                return {
                    ...m,
                    selected: false,
                    match: true,
                }
            })

            let tooltip = {
                text: '',
                show: false,
                sidebarLeftWidth: 0,
                top: 0,
            }

            let showMenu = false
            let showSidebarRight = false
            // parse the querystring/hash, if present
            let coordinates = __INITIAL_MAP_COORDINATES__
            let currentMap

            if (action.hash) {
                // drop the initial #
                let hashString = action.hash.replace('#', '')

                // split by each parameter
                let paramsObj = hashString.split('&').reduce((params, param) => {
                    let [key, value] = param.split('=')
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''
                    // split layers
                    if (key === 'layers') {
                        params[key] = value.split(',')
                    }
                    return params
                }, {})

                // if we have valid lat, lng & zoom params
                if (paramsObj.lat && paramsObj.lng && paramsObj.zoom) {
                    coordinates = {
                        lat: parseFloat(paramsObj.lat) || 0,
                        lng: parseFloat(paramsObj.lng) || 0,
                        zoom: parseInt(paramsObj.zoom) || 0,
                    }
                }

                // if we have valid basemap param
                if (paramsObj.basemap) {
                    currentMap = {
                        name: paramsObj.basemap,
                    }
                }

                // if we have valid layers param
                if (paramsObj.layers) {
                    // open sidebars
                    showMenu = true
                    showSidebarRight = true

                    // for every active layer
                    paramsObj.layers.forEach((activeLayer, index) => {
                        // find it on layers array
                        layers = layers.map(l => {
                            let selected = l.selected
                            let order = null
                            // and activate it
                            if (l.id === activeLayer) {
                                selected = true
                                order = index
                            }
                            return {
                                ...l,
                                selected,
                                order,
                            }
                        })
                    })
                }
            }

            const DEFAULT_MAP = {
                name: 'osm-mapbox-light',
            }

            let baseMaps = BASE_MAPS_MOCK

            let storedBaseMap = localStorage.getItem('lastBaseMap')
            if (storedBaseMap) {
                try {
                    storedBaseMap = JSON.parse(storedBaseMap)
                } catch (e) {
                    console.error('stored lastBaseMap data is corrupt', e)
                }
            }

            let mapProperties = {
                initialCoordinates: coordinates,
                currentMap: storedBaseMap || currentMap || DEFAULT_MAP,
            }
            var newsTimestamp = window.localStorage.getItem("newsTimestamp")
            var lastValidTimestamp = "1505847454072"

            // Object to be returned
            var _return = {
                currentLevel: 0,
                layers,
                menuItems,
                showMenu,
                showSidebarRight,
                tooltip,
                searchString: '',
                mapProperties,
                scrollTop: 0,
                places,
                baseMaps,
                showPolygonDraw: true,
                showLoader: false,
                showTooltipMenu: true,
            }

            // Check if content from localstorage is equal to last timestamp
            if (newsTimestamp === lastValidTimestamp) {
                // Don't show news modal
                return {
                    ..._return,
                    newsModal: false,
                }
            }

            return {
                ..._return,
                newsModal: true,
                showModal: true,
            }

        case 'TOGGLE_LAYER':
            var newLayers = []
            var showSidebarRight = false
            newLayers = state.layers.map(l => layer(l, action, state.layers))
            for (var i = 0; i < newLayers.length; i++) {
                var l = newLayers[i];
                if (l.selected){
                    showSidebarRight = true
                }
            }
            return {
                ...state,
                layers: newLayers,
                showSidebarRight,
            }
        case 'TOGGLE_LAYER_INFORMATION':
        case 'SLIDE_LEFT_STYLES':
        case 'SLIDE_RIGHT_STYLES':
            var newLayers = []
            newLayers = state.layers.map(l => layer(l, action, state.layers))
            return {
                ...state,
                layers: newLayers,
            }
        case 'SLIDE_LAYER_UP':
            var newLayers = state.layers

            var myPosition
            var arrayBiggerThanMe = []
            var immediatelyBiggerThanMe
            var auxOrder

            // find this item
            for (var i=0, l=newLayers.length; i<l; i++) {
                if (newLayers[i].id === action.id) {
                    myPosition = i
                }
            }
            // find items with order higher than this item
            for (var j=0; j<l; j++) {
                if (newLayers[j].order !== undefined && newLayers[j].order > newLayers[myPosition].order) {
                    arrayBiggerThanMe.push(j)
                }
            }
            // if there are items with order higher than this item
            if (arrayBiggerThanMe.length > 0) {
                // sort them
                arrayBiggerThanMe.sort(function(a, b) {
                    return newLayers[a].order - newLayers[b].order
                })
                // selects the first higher one
                immediatelyBiggerThanMe = arrayBiggerThanMe[0]
                // swap them
                auxOrder = newLayers[myPosition].order
                newLayers[myPosition].order = newLayers[immediatelyBiggerThanMe].order
                newLayers[immediatelyBiggerThanMe].order = auxOrder
            }

            return {
                ...state,
                layers: newLayers,
            }
        case 'SLIDE_LAYER_DOWN':
            var newLayers = state.layers;

            var myPosition
            var arraySmallerThanMe = []
            var immediatelySmallerThanMe
            var auxOrder

            // find this item
            for (var i=0, l=newLayers.length; i<l; i++) {
                if (newLayers[i].id === action.id) {
                    myPosition = i
                }
            }
            // find items with order smaller than this item
            for (var j=0; j<l; j++) {
                if (newLayers[j].order !== undefined && newLayers[j].order < newLayers[myPosition].order) {
                    arraySmallerThanMe.push(j)
                }
            }
            // if there are items with order smaller than this item
            if (arraySmallerThanMe.length > 0) {
                // sort them
                arraySmallerThanMe.sort(function(a, b) {
                    return newLayers[b].order - newLayers[a].order
                })
                // selects the first smaller one
                immediatelySmallerThanMe = arraySmallerThanMe[0]
                // swap them
                auxOrder = newLayers[myPosition].order
                newLayers[myPosition].order = newLayers[immediatelySmallerThanMe].order
                newLayers[immediatelySmallerThanMe].order = auxOrder
            }

            return {
                ...state,
                layers: newLayers,
            }
        case 'DROP_LAYER':
            var draggedPosition = action.draggedPosition
            var targetPosition = action.targetPosition
            var newLayers = state.layers
            for (var i = 0; i < newLayers.length; i++) {
                if (typeof newLayers[i].order === 'number' && newLayers[i].order === draggedPosition){
                    // found dragged layer
                    if (targetPosition > draggedPosition){
                        // UP
                        // Move others down
                        for (var k = 0; k < newLayers.length; k++) {
                            if (typeof newLayers[k].order === 'number' && (newLayers[k].order <= targetPosition && newLayers[k].order > draggedPosition)){
                                // found layers that need to be changed
                                newLayers[k].order--
                            }
                        }
                    } else {
                        // DOWN
                        // Move others up
                        for (var k = 0; k < newLayers.length; k++) {
                            if (typeof newLayers[k].order === 'number' && (newLayers[k].order >= targetPosition && newLayers[k].order < draggedPosition)){
                                // found layers that need to be changed
                                newLayers[k].order++
                            }
                        }
                    }
                    newLayers[i].order = targetPosition
                    break
                }
            }
            return {
                ...state,
                layers: newLayers,
            }
        case 'SELECT_LAYER_STYLE':
            var newLayers = []
            newLayers = state.layers.map(l => {
                if (l.id !== action.id) {
                    return l
                }
                return {
                    ...l,
                    selectedLayerStyleId: action.styleId,
                };
            })
            return {
                ...state,
                layers: newLayers,
            }
        case 'TOGGLE_MENU':
            let currentLevel = state.currentLevel
            var newLayers = []

            // make a copy of the state
            var newMenuItems = [...state.menuItems]

            // if i'm closing
            if (action.selected === true) {
                // find myself
                newMenuItems.forEach(menuItem => {
                    if (menuItem.id === action.id) {
                        // if i have children
                        if (menuItem.submenus.length > 0) {
                            // close my children
                            menuItem.submenus.forEach(submenu => {
                                // find this submenu in menus array
                                newMenuItems.forEach(thisMenuItem => {
                                    if (thisMenuItem.idMenu === submenu) {
                                        // close it
                                        thisMenuItem.selected = false
                                    }
                                })
                            })
                        } else {
                            // i don't have children, close myself
                            newMenuItems = newMenuItems.map(m => menuItem(m, action, state.currentLevel))
                        }
                    }
                })
            } else {
                // if i'm opening, do it right away
                newMenuItems = newMenuItems.map(m => menuItem(m, action, state.currentLevel))
            }
            if (action.selected) {
                currentLevel--
            } else {
                currentLevel++
            }
            return {
                ...state,
                currentLevel,
                menuItems: newMenuItems,
            };
        case 'UNTOGGLE_MENUS':
            var newMenuItems = state.menuItems.map(m => menuItem(m, action))
            return {
                ...state,
                currentLevel: 0,
                menuItems: newMenuItems,
            }
        case 'CLOSE_TOOLBARS':
            return {
                ...state,
                toolbarActive: null,
            }
        case 'SEARCH_LAYER':
            var newLayers = state.layers.map(l => searchLayer(l, action))
            var filteredLayers = newLayers.filter(layer => layer.match)
            var newMenuItems = []
            var searchString = action.text
            if (action.text === '') {
                // when emptying search, return all items
                newMenuItems = state.menuItems.map(m => {
                    return {
                        ...m,
                        match: true,
                        searchString,
                    }
                })
            } else {
                newMenuItems = state.menuItems.map(m => searchMenuItem(m, filteredLayers, state.menuItems))
            }
            return {
                ...state,
                layers: newLayers,
                menuItems: newMenuItems,
                searchString,
            }
        case 'CLEAN_SEARCH':
            return {
                ...state,
                searchString: '',
            }
        case 'SHOW_DESCRIPTION':
            var layerResult = state.layers.find(l => layer(l, action))
            var newTooltip
            if (layerResult) {
                newTooltip = {
                    text: layerResult.description,
                    show: true,
                    sidebarLeftWidth: action.sidebarLeftWidth,
                    // parentHeight: action.parentHeight,
                    // top: action.top,
                    mouseY: action.mouseY,
                }
            } else {
                newTooltip = {
                    text: '',
                    show: false,
                }
            }
            return {
                ...state,
                tooltip: newTooltip,
            }
        case 'HIDE_DESCRIPTION':
            return {
                ...state,
                tooltip: {
                    text: "",
                    show: false,
                }
            }
        case 'UPDATE_SCROLL_TOP':
            return {
                ...state,
                scrollTop: action.scrollTop
            }
        case 'SHOW_MENU_LAYER':
            return {
                ...state,
                showMenu: true,
                showTooltipMenu: false,
            }
        case 'HIDE_MENU_LAYER':
            return {
                ...state,
                showMenu: false,
            }
        case 'SHOW_SIDEBAR_RIGHT':
            return {
                ...state,
                showSidebarRight: true,
            }
        case 'HIDE_SIDEBAR_RIGHT':
            return {
                ...state,
                showSidebarRight: false,
            }
        case 'REMOVE_ALL_LAYERS':
            var newLayers = []
            newLayers = state.layers.map(l => {
                return {
                    ...l,
                    selected: false,
                    order: null,
                }
            })

            return {
                ...state,
                layers: newLayers,
                showSidebarRight: false,
            }
        case 'POPULATE_STATE_WITH_LAYER_DATA':
            let returnedLayers = action.data
            var newLayers = state.layers

            newLayers = state.layers.map(l => {
                let features = null
                for (var i = 0; i < returnedLayers.length; i++) {
                    var returnedLayer = returnedLayers[i];
                    var returnedItems = returnedLayer.features
                    if (returnedItems && returnedItems.length > 0) {
                        let featureId = returnedItems[0].id.split('.')[0]
                        if (l.name === featureId) {
                            features = returnedItems
                        }
                    }

                }

                return {
                    ...l,
                    features,
                }
            })

            return {
                ...state,
                layers: newLayers,
            }

        case 'UPDATE_LAST_CLICK_DATA':
            return {
                ...state,
                lastClickData: action.data,
            }

        case 'LAST_MAP_POSITION':
            var mapProperties = {
                ...state.mapProperties,
                currentCoordinates: action.data,
            }

            return {
                ...state,
                mapProperties
            }

        case 'SHOW_STREET_VIEW':
            return {
                ...state,
                streetViewCoordinates: action.data,
            }

        case 'HIDE_STREET_VIEW':
            return {
                ...state,
                streetViewCoordinates: null,
                toolbarActive: null,
            }

        case 'GET_MODAL_DATA':
            var returnedItems = action.data.features
            var newLayers = state.layers

            var PAGE_SIZE = 5
            var pages = []

            // At least one element returned from the server
            if (returnedItems && returnedItems.length > 0) {

                // Removing string content after dot
                let featureId = returnedItems[0].id.split('.')[0]

                // split items into pages
                let returnedItemsCopy = JSON.parse(JSON.stringify(returnedItems))
                let returnedItemsCount = returnedItemsCopy.length

                while (returnedItemsCopy.length) {
                    pages.push(returnedItemsCopy.splice(0,PAGE_SIZE))
                }

                newLayers = state.layers.map(l => {
                    // extends modal object, if it exists
                    var modal = {}
                    if (l.modal) {
                        modal = {...l.modal}
                    }

                    if (l.name === featureId) {
                        modal.pages = pages
                        modal.currentPage = 0
                        modal.totalItemsCount = returnedItemsCount
                    }
                    return {
                        ...l,
                        modal,
                    }
                })
            }

            return {
                ...state,
                layers: newLayers,
            }

        case 'OPEN_MODAL':
            var showModal = true
            var currentModalLayer = action.layer
            var newLayers = state.layers
            var showExportFile = false

            newLayers = state.layers.map(l => {
                // extends modal object, if it exists
                var modal = {}
                if (l.modal) {
                    modal = {...l.modal}
                }

                // set to false
                modal.activeLayer = false

                // found my searched item
                if (l.id === currentModalLayer.id) {
                    // set to true
                    modal.activeLayer = true
                }

                return {
                    ...l,
                    modal,
                }
            })

            return {
                ...state,
                showModal,
                currentModalLayer,
                layers: newLayers,
            }

        case 'CLOSE_MODAL':
            var showModal = false
            var newsModal = false
            var showAbout = false
            var toolbarActive = null
            var hideUpdates = document.getElementById("newsTimestamp")
            // set a timestamp from a hidden input from news modal on news modal
            if (hideUpdates) {
                window.localStorage.setItem('newsTimestamp', hideUpdates.dataset.value)
            }

            return {
                ...state,
                showModal,
                newsModal,
                showAbout,
                toolbarActive,
            }

        case 'CHANGE_ACTIVE_TAB':
            var clickedModalLayer = action.layer
            var newLayers = state.layers

            newLayers = state.layers.map(l => {
                // extends modal object, if it exists
                var modal = {}
                if (l.modal) {
                    modal = {...l.modal}
                }

                // set to false
                modal.activeLayer = false

                // found my searched item
                if (l.id === clickedModalLayer.id) {
                    // set to true
                    modal.activeLayer = true
                }

                return {
                    ...l,
                    modal,
                }
            })

            return {
                ...state,
                layers: newLayers,
            }

        case 'PAGINATE':
            var newLayers = state.layers

            newLayers = state.layers.map(l => {
                // extends modal object, if it exists
                var modal = {}
                if (l.modal) {
                    modal = {...l.modal}
                }

                // found my searched item
                if (l.id === action.layer.id) {
                    modal.currentPage = action.page
                }

                return {
                    ...l,
                    modal,
                }
            })

            return {
                ...state,
                layers: newLayers,
            }

        case 'CHANGE_ACTIVE_TOOLBAR':
            var toolbarActive = action.item
            if(toolbarActive === state.toolbarActive){
                toolbarActive = undefined
            }

            // when the draw controls or polygon search opens or closes
            // the state should change
            // need to refactor because of repeated code
            var showDrawControls = state.showDrawControls === undefined ? false : state.showDrawControls
            var showSearchPolygon = state.showSearchPolygon === undefined ? false : state.showSearchPolygon
            var showHelp = state.showHelp === undefined ? false : state.showHelp
            var showAbout = state.showAbout === undefined ? false : state.showAbout
            var showModal = state.showModal === undefined ? false : state.showModal

            if (action.item === 'draw') {
                if (!state.showDrawControls) {
                    showSearchPolygon = false
                }
                showDrawControls = !state.showDrawControls
            } else if (state.toolbarActive === 'draw') {
                showDrawControls = false
            }

            if (action.item === 'polygonRequest') {
                if (!state.showSearchPolygon) {
                    showDrawControls = false
                }
                showSearchPolygon = !state.showSearchPolygon
            } else if (state.toolbarActive === 'draw') {
                showSearchPolygon = false
            }

            if (action.item === 'help') {
                if (!state.showHelp) {
                    showHelp = false
                }
                showHelp = !state.showHelp
            } else if (state.toolbarActive === 'help') {
                showHelp = false
            }

            if (action.item === 'about') {
                if (!state.showAbout) {
                    showAbout = false
                }
                showAbout = !state.showAbout
                if (showAbout) {
                    showModal = true
                } else {
                    showModal = false
                }
            } else if (state.toolbarActive === 'about') {
                showAbout = false
            }

            return {
                ...state,
                toolbarActive,
                showDrawControls,
                showSearchPolygon,
                showHelp,
                showAbout,
                showModal,
            }

        case 'TOGGLE_PLACE':
            var clickedPlace = action.item
            var currentPlace = state.mapProperties.placeToCenter
            var placeFound = null
            var id = clickedPlace.id
            var places = state.places.slice()
            var root = {
                id: "root",
                nodes: places
            }

            placeFound = togglePlace(root, id);

            return {
                ...state,
                places,
            }

        case 'ADD_PLACE_LAYER':
            var places = state.places.slice()
            var root = {
                id: "root",
                nodes: places
            }
            var placeToCenter = searchPlaceById(root, action.item.id)
            var bounds = placeToCenter.geom.split(',')
            if((state.bounds === bounds) || (state.toolbarActive !== "search")){
                placeToCenter = undefined
            }
            var mapProperties = {
                ...state.mapProperties,
                placeToCenter,
                googleSearchCoord: null,
            }
            return {
                ...state,
                mapProperties,
            }

        case 'CHANGE_OPACITY':
            var opacity = parseInt(action.item) / 10
            var mapProperties = {
                ...state.mapProperties,
                opacity,
            }
            return {
                ...state,
                mapProperties,
            }
        case 'CHANGE_CONTOUR':
            var contour = action.item
            var mapProperties = {
                ...state.mapProperties,
                contour,
            }
            return {
                ...state,
                mapProperties,
            }
        case 'SEARCH_PLACES':
            resultPlaces = []
            var places = state.places.slice()
            var place = searchPlaceByTitle(places[0], action.item)
            places[0].search = action.item
            return {
                ...state,
                places,
            }
        case 'CHANGE_ACTIVE_BASE_MAP':
            var baseMap = action.baseMap
            var currentMap = state.mapProperties.currentMap
            var mapProperties = state.mapProperties
            currentMap = baseMap
            mapProperties = {
                ...mapProperties,
                currentMap
            }

            localStorage.setItem('lastBaseMap', JSON.stringify(currentMap))

            return {
                ...state,
                mapProperties,
            }

        case 'UPDATE_BASEMAP_LOADING_STATUS':
            var mapProperties = state.mapProperties
            var currentMap = mapProperties.currentMap
            currentMap = {
                ...currentMap,
                loadDone: true,
            }
            mapProperties = {
                ...mapProperties,
                currentMap
            }
            return {
                ...state,
                mapProperties,
            }
        case 'POPULATE_STATE_WITH_POLYGON_DATA':
            layers = action.data

            layers = layers.filter(l => {
                if (l.length > 0){
                    return l
                }
            })

            let layerItems = layers.map((l) => {
                let object = {}
                if(l.length > 0){
                    object = {
                        "category": l[0].category,
                        "items": l,
                    }
                    return object
                }
            })
            layerItems = layerItems.map(layerItem => {
                if(layerItem.category === "População"){
                    layerItem.populacao_total = layerItem.items.reduce((acc, setor) =>{
                        return acc + setor.properties.População_Censo_2010
                    }, 0)
                    layerItem.domicilios_total = layerItem.items.reduce((acc, setor) =>{
                        return acc + setor.properties.Domicílios_Censo_2010
                    }, 0)

                    layerItem.piramide_total = {}
                    for (var i = 0; i < layerItem.items.length; i++) {
                        var item = layerItem.items[i];
                        var itemKeyPropertiesArray = Object.keys(item.properties)
                        for (var j = 0; j < itemKeyPropertiesArray.length; j++) {
                            var thisKey = itemKeyPropertiesArray[j]
                            var prefix = thisKey.substring(0,2)
                            if( prefix === "h_" || prefix === "m_"){
                                layerItem.piramide_total[thisKey] = (layerItem.piramide_total[thisKey] || 0) + item.properties[thisKey]
                            }

                        }

                    }
                }
                return layerItem
            })


            let polygonData = layerItems
            return {
                ...state,
                polygonData,
                showSidebarRight: true,
                showPolygonDraw: false,
                showLoader: false,
            }

        case 'REMOVE_POLYGON_DATA':
            let selectedLayers = state.layers.filter(l => l.selected)
            if(selectedLayers.length > 0){
                showSidebarRight = true
            } else {
                showSidebarRight = false
            }
            return {
                ...state,
                polygonData: null,
                showSidebarRight,
                showPolygonDraw: true,
            }
        case 'START_POLYGON_DATA_REQUEST':
            return {
                ...state,
                showLoader: true,
            }
        case 'ADD_GOOGLE_PLACES_LAT_LONG':
            var mapProperties = state.mapProperties
            var latLong = action.latLong
            mapProperties = {
                ...mapProperties,
                googleSearchCoord: latLong,
                placeToCenter: null,
            }
            return {
                ...state,
                mapProperties,
            }

        case 'HIDE_HELP':
            return {
                ...state,
                showHelp: false,
                toolbarActive: null,
            }

        default:
            return state
    }
}

const layer = (layer, action, layers) => {
    switch (action.type) {
        case 'TOGGLE_LAYER':
            // close other layers' information panel
            if (layer.id !== action.id) {
                return {
                    ...layer,
                    showInformation: false,
                }
            }

            let order
            let features = layer.features || null
            let modal = layer.modal || null

            if (layer.selected) {
                // disabling layer
                // just remove order attribute
                order = null
                features = null
                modal = null
            } else {
                // enabling layer
                // find the biggest and return +1
                order = 0
                layers.map(l => {
                    if (typeof l.order === 'number') {
                        if (l.order > order) {
                            order = l.order
                        }
                    }
                })
                order++
            }

            return {
                ...layer,
                selected: !layer.selected,
                showInformation: true,
                order,
                features,
                modal,
            }
        case 'TOGGLE_LAYER_INFORMATION':
            if (layer.id !== action.id) {
                return layer
            }
            if (typeof layer.showInformation === 'undefined') {
                layer.showInformation = false // will be inverted on return
            }
            return {
                ...layer,
                showInformation: !layer.showInformation,
            }
        case 'TOGGLE_MENU':
            if (layer.id !== action.id) {
                return layer
            }
            return {
                ...layer,
                selected: !layer.match,
            }
        case 'SHOW_DESCRIPTION':
            if (layer.id === action.id) {
                return layer
            }
            return undefined;
        case 'HIDE_DESCRIPTION':
            if (layer.id !== action.id) {
                return layer
            }
            return {
                ...layer,
                showDescription: false,
            }
        case 'SLIDE_LEFT_STYLES':
            if (layer.id !== action.id) {
                return layer
            }
            var stylesPositionCounter = layer.stylesPositionCounter
            if (stylesPositionCounter !== 0) {
                stylesPositionCounter--
            }
            return {
                ...layer,
                stylesPositionCounter,
            }
        case 'SLIDE_RIGHT_STYLES':
            const STYLES_IN_A_ROW = 5
            if (layer.id !== action.id) {
                return layer
            }
            var stylesPositionCounter = layer.stylesPositionCounter || 0
            if (stylesPositionCounter < layer.styles.length - STYLES_IN_A_ROW) {
                stylesPositionCounter++
            }
            return {
                ...layer,
                stylesPositionCounter,
            }

    }
}

const menuItem = (menuItem, action, currentLevel) => {
    switch (action.type){
        case 'TOGGLE_MENU':
            if (menuItem.id !== action.id) {
                return menuItem
            }
            return {
                ...menuItem,
                selected: !menuItem.selected,
            }
        case 'UNTOGGLE_MENUS':
            return {
                ...menuItem,
                match: true,
                selected: false,
            }
        default:
            return menuItem
    }
}

/**
 * @param {Array} layers - an array of layers
 * @param {Number} key - layer key to be found
 *
 * This function finds a layer by key
 *
 * @return {Object} layer object that was found
 */
const getLayerByKey = (layers, key) => {
    var returnLayer = undefined
    layers.forEach(function(layer) {
        if (layer.key === key) {
            returnLayer = layer
        }
    })
    return returnLayer
}

/**
 * @param {Array} menuItems - an array of menu items
 * @param {Number} id - submenu item id
 *
 * This function finds a menuItem by id
 *
 * @return {Object} menuItem object that was found
 */
const getMenuItemById = (menuItems, id) => {
    var returnMenuItem = undefined
    menuItems.forEach(function(menuItem) {
        if (menuItem.idMenu === id) {
            returnMenuItem = menuItem
        }
    })
    return returnMenuItem
}

/**
 * @param {Object} menuItem
 * @param {Array} layers
 *
 * This function returns a menuItem unchanged if
 * it is does not match the user search string. It
 * returns a menu item with match property changed to
 * true if it matches the user search string
 *
 * @return {Object} menuItem object that was found
 */
const searchMenuItem = (menuItem, layers, menuItems) => {
    var layerMatch = false
    menuItem.layers.forEach(function(menuItemLayer) {
        if (getLayerByKey(layers, menuItemLayer) !== undefined) {
            layerMatch = true
        }
    })

    if (menuItem.submenus.length > 0) {
        menuItem.submenus.forEach(function(menuItemSubmenu) {
            var submenuItem = getMenuItemById(menuItems, menuItemSubmenu)
            if (submenuItem !== undefined) {
                submenuItem.layers.forEach(function(submenuItemLayer) {
                    if (getLayerByKey(layers, submenuItemLayer) !== undefined) {
                        layerMatch = true
                    }
                })
            }
        })
    }

    if (layerMatch) {
        return {
            ...menuItem,
            match: true,
            selected: true,
        }
    } else {
        return {
            ...menuItem,
            match: false,
        }
    }
}

const searchLayer = (layer, action) => {
    if (action.text === '') {
        return {
            ...layer,
            match: true,
        }
    }

    if (layer.title.toLowerCase().includes(action.text.toLowerCase())) {
        return {
            ...layer,
            match: true,
        }
    } else if (layer.description.toLowerCase().includes(action.text.toLowerCase())) {
        return {
            ...layer,
            match: true,
        }
    } else {
        return {
            ...layer,
            match: false,
        }
    }
}

export default appReducer
