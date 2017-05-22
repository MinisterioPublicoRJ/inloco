import geoServerXmlReducer from './reducers/geoServerXmlReducer';
import menuReducer from '../Menu/menuReducer';

const appReducer = (state = [], action) => {
    switch(action.type){
        case 'POPULATE_APP':
            let layers = geoServerXmlReducer(action.xmlData.xmlData);
            layers = layers.map(l => {
                return {...l,
                    selected: false,
                    match: false
                }
            });
            let menuItems = menuReducer(layers);
            menuItems = menuItems.map(m => {
                return {...m,
                    selected: false,
                    match: false
                }
            });
            return {
                currentLevel: 0,
                layers,
                menuItems
            };
        case 'TOGGLE_LAYER':
            var newLayers = [];
            newLayers = state.layers.map(l => layer(l, action))
            return {
                layers: newLayers,
                menuItems: state.menuItems
            };
        case 'TOGGLE_MENU':
            var newMenuItems = [];
            let currentLevel = state.currentLevel;
            newMenuItems = state.menuItems.map(m => menuItem(m, action, state.currentLevel))
            if(action.selected){
                currentLevel--;
            } else {
                currentLevel++;
            }
            return {
                currentLevel,
                layers: state.layers,
                menuItems: newMenuItems
            };
        case 'UNTOGGLE_MENUS':
            var newMenuItems = state.menuItems.map(m => menuItem(m, action))
            return {
                currentLevel: 0,
                layers: state.layers,
                menuItems: newMenuItems
            }
        case 'SEARCH_LAYER':
            var newMenuItems = state.menuItems.map(m => searchMenuItem(m, action));
            var newLayers = state.layers.map(m => searchLayer(m, action));
            return {
                currentLevel: state.currentLevel,
                layers: newLayers,
                menuItems: newMenuItems
            }
        default:
            return state;
    }
};

const layer = (layer, action) => {
    switch (action.type){
        case('TOGGLE_LAYER'):
            if (layer.id !== action.id){
                return layer;
            }
            return {...layer,
                selected: !layer.selected
            };
        default:
            return layer;
    }
}

const menuItem = (menuItem, action, currentLevel) => {
    switch (action.type){
        case('TOGGLE_MENU'):
            if (menuItem.id !== action.id){
                return menuItem;
            }
            return {...menuItem,
                selected: !menuItem.selected,
                match: !menuItem.selected ? true : false
            };
        case 'UNTOGGLE_MENUS':
            return {...menuItem,
                match: false
            }
        default:
            return menuItem;
    }
}

const searchMenuItem = (menuItem, action) => {
    if (action.text === "") {
        return {...menuItem,
                match: false
            };
    }

    if (menuItem.title.toLowerCase().includes(action.text.toLowerCase())) {
        return {...menuItem,
                match: true
            };
    } else {
        return {...menuItem,
                match: false
            };
    }

    // if (m.description.toLowerCase().includes(action.text.toLowerCase())) {
    //     return m;
    // }
}

const searchLayer = (layer, action) => {
    if (action.text === "") {
        return {...layer,
                match: false
            };
    }

    if (layer.title.toLowerCase().includes(action.text.toLowerCase())) {
        console.log("action", action);
        console.log("layer", layer);
        return {...layer,
                match: true
            };
    } else if (layer.description.toLowerCase().includes(action.text.toLowerCase())) {
        console.log("action", action);
        console.log("layer", layer);
        return {...layer,
                match: true
            };
    } else {
        return {...layer,
                match: false
            };
    }
}

export default appReducer;
