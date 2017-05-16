const appReducer = (state = [], action) => {
    switch(action.type){
        case 'POPULATE_MENU':
            return {
                menu: action.data.menu,
                layers: action.data.layers
            };
        default:
            return state;
    }
};

export default appReducer;
