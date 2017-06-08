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
                    showDescription: false
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
            let tooltip = {
                text: "",
                show: false,
                sidebarLeftWidth: 0,
                top: 0
            }
            return {
                currentLevel: 0,
                layers,
                menuItems,
                showMenu: false,
                tooltip,
                searchString: ""
            };
        case 'TOGGLE_LAYER':
            var newLayers = [];
            newLayers = state.layers.map(l => layer(l, action))
            return {
                ...state,
                layers: newLayers
            };
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
                menuItems: newMenuItems
            };
        case 'UNTOGGLE_MENUS':
            var newMenuItems = state.menuItems.map(m => menuItem(m, action))
            return {
                ...state,
                currentLevel: 0,
                menuItems: newMenuItems
            }
        case 'SEARCH_LAYER':
            var newLayers = state.layers.map(l => searchLayer(l, action))
            var filteredLayers = newLayers.filter(layer => layer.match)
            var newMenuItems = [];
            var searchString = action.text;
            if(action.text === ''){
                // when emptying search, return all items
                newMenuItems = state.menuItems.map(m => {
                    return {
                        ...m,
                        match: true,
                        searchString
                    }
                })
            } else {
                newMenuItems = state.menuItems.map(m => searchMenuItem(m, filteredLayers, state.menuItems))
            }
            return {
                ...state,
                layers: newLayers,
                menuItems: newMenuItems,
                searchString
            }
        case 'CLEAN_SEARCH':
            return {
                ...state,
                searchString: ""
            }
        case 'SHOW_DESCRIPTION':
            var layerResult = state.layers.find(l => layer(l, action));
            var newTooltip;
            if(layerResult){
                newTooltip = {
                    text: layerResult.description,
                    show: true,
                    sidebarLeftWidth: action.sidebarLeftWidth,
                    parentHeight: action.parentHeight,
                    top: action.top
                }
            } else {
                newTooltip = {
                    text: "",
                    show: false
                }
            }
            return {
                ...state,
                tooltip: newTooltip
            }
        case 'HIDE_DESCRIPTION':
            return {
                ...state,
                tooltip: {
                    text: "",
                    show: false
                }
            }
        case 'SHOW_MENU_LAYER':
            return {
                ...state,
                showMenu: true
            }
        case 'HIDE_MENU_LAYER':
            return {
                ...state,
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
            if (layer.id === action.id) {
                return layer
            }
            return undefined;
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

/**
 * @param {Array} layers - an array of layers
 * @param {Number} key - layer key to be found
 *
 * This function finds a layer by key
 *
 * @return {Object} layer object that was found
 */
const getLayerByKey = (layers, key) => {
    var returnLayer = undefined;
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
    var returnMenuItem = undefined;
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
        if(getLayerByKey(layers, menuItemLayer) !== undefined){
            layerMatch = true
        }
    })

    if(menuItem.submenus.length > 0){
        menuItem.submenus.forEach(function(menuItemSubmenu) {
            var submenuItem = getMenuItemById(menuItems, menuItemSubmenu);
            if(submenuItem !== undefined){
                submenuItem.layers.forEach(function(submenuItemLayer) {
                    if(getLayerByKey(layers, submenuItemLayer) !== undefined){
                        layerMatch = true
                    }
                })
            }
        })
    }

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
