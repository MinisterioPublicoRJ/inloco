import geoServerXmlReducer from './reducers/geoServerXmlReducer'
import menuReducer from '../Menu/menuReducer'

const appReducer = (state = [], action) => {
    switch(action.type){
        case 'POPULATE_APP':
            let layers = geoServerXmlReducer(action.xmlData.xmlData);
            layers = layers.map(l => {
                return {
                    ...l,
                    selected: false,
                    match: true,
                    showDescription: false,
                }
            });
            let menuItems = menuReducer(layers)
            menuItems = menuItems.map(m => {
                return {
                    ...m,
                    selected: false,
                    match: true,
                }
            });
            return {
                currentLevel: 0,
                layers,
                menuItems,
                showMenu: false
            };
        case 'TOGGLE_LAYER':
            var newLayers = []
            newLayers = state.layers.map(l => layer(l, action))
            return {
                currentLevel: state.currentLevel,
                layers: newLayers,
                menuItems: state.menuItems,
            };
        case 'TOGGLE_MENU':
            var newMenuItems = []
            let currentLevel = state.currentLevel
            var newLayers = []
            newMenuItems = state.menuItems.map(m => menuItem(m, action, state.currentLevel))
            if (action.selected) {
                currentLevel--
            } else {
                currentLevel++
            }
            return {
                currentLevel,
                layers: state.layers,
                menuItems: newMenuItems,
            };
        case 'UNTOGGLE_MENUS':
            var newMenuItems = state.menuItems.map(m => menuItem(m, action))
            return {
                currentLevel: 0,
                layers: state.layers,
                menuItems: newMenuItems,
            }
        case 'SEARCH_LAYER':
            var newLayers = state.layers.map(l => searchLayer(l, action))
            var filteredLayers = newLayers.filter(layer => layer.match)
            var newMenuItems = []
            if(action.text === ''){
                // when emptying search, return all items
                newMenuItems = state.menuItems.map(m => {
                    return {
                        ...m,
                        match: true,
                    }
                })
            } else {
                newMenuItems = state.menuItems.map(m => searchMenuItem(m, filteredLayers))
            }

            return {
                currentLevel: state.currentLevel,
                layers: newLayers,
                menuItems: newMenuItems,
            }
        case 'SHOW_DESCRIPTION':
            var newLayers = state.layers.map(l => layer(l, action))
            return {
                currentLevel: state.currentLevel,
                layers: newLayers,
                menuItems: state.menuItems,
            }
        case 'HIDE_DESCRIPTION':
            var newLayers = state.layers.map(l => layer(l, action))
            return {
                currentLevel: state.currentLevel,
                layers: newLayers,
                menuItems: state.menuItems,
            }
        case 'SHOW_MENU_LAYER':
            return {
                currentLevel: state.currentLevel,
                layers: state.layers,
                menuItems: state.menuItems,
                showMenu: true
            }
        case 'HIDE_MENU_LAYER':
            return {
                currentLevel: state.currentLevel,
                layers: state.layers,
                menuItems: state.menuItems,
                showMenu: false
            }
        default:
            return state
    }
}

const layer = (layer, action) => {
    switch (action.type){
        case('TOGGLE_LAYER'):
            if (layer.id !== action.id) {
                return layer
            }
            return {
                ...layer,
                selected: !layer.selected,
            }
        case('TOGGLE_MENU'):
            if (layer.id !== action.id){
                return layer
            }
            return {
                ...layer,
                selected: !layer.match,
            }
        case('SHOW_DESCRIPTION'):
            if (layer.id !== action.id) {
                return layer
            }
            return {
                ...layer,
                showDescription: true,
            }
        case('HIDE_DESCRIPTION'):
            if (layer.id !== action.id) {
                return layer
            }
            return {
                ...layer,
                showDescription: false,
            };
        default:
            return layer
    }
}

const menuItem = (menuItem, action, currentLevel) => {
    switch (action.type){
        case('TOGGLE_MENU'):
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

const searchMenuItem = (menuItem, layers) => {
    var layerMatch = false
    menuItem.layers.forEach(function(menuItemLayer) {
        layers.forEach(function(layer) {
            if (layer.key === menuItemLayer) {
                layerMatch = true
            }
        })
    })
    if(layerMatch){
        return {
            ...menuItem,
            match: true,
        }
    } else {
        return {
            ...menuItem,
            match: false,
        }
    }
}

const searchLayer = (layer, action) => {
    if (action.text === "") {
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
