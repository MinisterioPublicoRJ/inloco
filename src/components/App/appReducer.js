import geoServerXmlReducer from './reducers/geoServerXmlReducer';
import menuReducer from '../Menu/menuReducer';

const appReducer = (state = [], action) => {
    switch(action.type){
        case 'POPULATE_APP':
            let layers = geoServerXmlReducer(action.xmlData.xmlData);
            layers = layers.map(l => {
                return {...l,
                    selected: false
                }
            });
            let menuItems = menuReducer(layers);
            menuItems = menuItems.map(m => {
                return {...m,
                    selected: false
                }
            });
            console.log(menuItems);
            return {
                layers,
                menuItems
            };
        case 'TOGGLE_LAYER':
            let newLayers = [];
            console.log('TOGGLE_LAYER');
            console.log(state);
            newLayers = state.layers.map(l => layer(l, action))
            return {
                layers: newLayers,
                menuItems: state.menuItems
            };
        case 'TOGGLE_MENU':
            let newMenuItems = [];
            console.log('TOGGLE_MENU');
            console.log(action.id);
            console.log(state);
            newMenuItems = state.menuItems.map(m => menuItem(m, action))
            return {
                layers: state.layers,
                menuItems: newMenuItems
            };
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
            console.log(layer.id)
            console.log(action.id)
            return {...layer,
                selected: !layer.selected
            };
        default:
            return layer;
    }
}

const menuItem = (menuItem, action) => {
    switch (action.type){
        case('TOGGLE_MENU'):
            if (menuItem.id !== menuItem.id){
                return menuItem;
            }
            return {...menuItem,
                selected: !menuItem.selected
            };
        default:
            return menuItem;
    }
}

export default appReducer;
