const appReducer = (state = [], action) => {
    switch(action.type){
        case 'POPULATE_MENU':
            console.log('switch appReducer', action);
            return {
                menu: action.data
            };
        default:
            return state;
    }
};

export default appReducer;
