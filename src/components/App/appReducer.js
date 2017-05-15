const appReducer = (state = [], action) => {
    switch(action.type){
        case 'POPULATE_MENU':
            console.log('switch appReducer', action);
            return {
                menu: action.data.menu,
                camadas: action.data.camadas
            };
        default:
            return state;
    }
};

export default appReducer;
