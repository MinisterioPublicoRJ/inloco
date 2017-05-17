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
        default:
            return state;
    }
};

export default appReducer;
