import geoServerXmlReducer from './reducers/geoServerXmlReducer';
import menuReducer from '../Menu/menuReducer';

const appReducer = (state = [], action) => {
    switch(action.type){
        case 'POPULATE_APP':
            let layers = geoServerXmlReducer(action.xmlData.xmlData);
            let menu = menuReducer(layers)
            return {
                layers,
                menu
            };
        case 'TOGGLE_LAYER':
            console.log('TOGGLE_LAYER');
            state.map(l => {
                if (l.id !== action.id){
                    return l;
                }
                return {...l,
                    selected: !l.selected
                }
            })

            return {
                layers,
                menu
            };
        default:
            return state;
    }
};

export default appReducer;
