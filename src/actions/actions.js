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

// on MenuContainer.js
export const toggleLayer = (item) => {
    return {
        type: 'TOGGLE_LAYER',
        id: item.id
    }
}

export const toggleMenu = (item) => {
    return {
        type: 'TOGGLE_MENU',
        id: item.id,
        selected: item.selected
    }
}

export const untoggleAll = () => {
    return {
        type: 'UNTOGGLE_MENUS'
    }
}

export const showDescription = (event, layer, sidebarLeftWidth, sidebarLeftHeight) => {
    return {
        type: 'SHOW_DESCRIPTION',
        id: layer.id,
        y: event.clientY,
        sidebarLeftWidth,
        sidebarLeftHeight
    }
}

export const hideDescription = (layer) => {
    return {
        type: 'HIDE_DESCRIPTION',
        id: layer.id
    }
}
