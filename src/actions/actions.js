// on App.js
export const populateApp = (xmlData) => {
    return {
        type: 'POPULATE_APP',
        xmlData: xmlData
    }
}

// on HeaderContainer.js
export const showMenuLayer = () => {
    return {
        type: 'SHOW_MENU_LAYER'
    }
}
