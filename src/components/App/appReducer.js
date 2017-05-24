import geoServerXmlReducer from './reducers/geoServerXmlReducer';
import menuReducer from '../Menu/menuReducer';

const appReducer = (state = [], action) => {
    switch(action.type){
        case 'POPULATE_APP':
            let layers = geoServerXmlReducer(action.xmlData.xmlData);
            layers = layers.map(l => {
                return {...l,
                    selected: false,
                    showDescription: false
                }
            });
            let menuItems = menuReducer(layers);
            menuItems = menuItems.map(m => {
                return {...m,
                    selected: false
                }
            });
            return {
                currentLevel: 0,
                layers,
                menuItems
            };
        case 'TOGGLE_LAYER':
            let newLayers = [];
            newLayers = state.layers.map(l => layer(l, action))
            return {
                layers: newLayers,
                menuItems: state.menuItems
            };
        case 'TOGGLE_MENU':
            var newMenuItems = [];
            var currentLevel = state.currentLevel;
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
        case 'SHOW_DESCRIPTION':
            var newLayers = state.layers.map(l => layer(l, action))
            return {
                currentLevel: state.currentLevel,
                layers: newLayers,
                menuItems: state.menuItems
            }
        case 'HIDE_DESCRIPTION':
            var newLayers = state.layers.map(l => layer(l, action))
            return {
                currentLevel: state.currentLevel,
                layers: newLayers,
                menuItems: state.menuItems
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
        case('SHOW_DESCRIPTION'):
            if (layer.id !== action.id){
                return layer;
            }
            return {...layer,
                showDescription: true
            };
        case('HIDE_DESCRIPTION'):
            if (layer.id !== action.id){
                return layer;
            }
            return {...layer,
                showDescription: false
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
                selected: !menuItem.selected
            };
        case 'UNTOGGLE_MENUS':
            return {...menuItem,
                selected: false
            }
        default:
            return menuItem;
    }
}

export default appReducer;
