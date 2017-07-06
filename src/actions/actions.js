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

export const showSidebarRight = () => {
    return {
        type: 'SHOW_SIDEBAR_RIGHT'
    }
}

// on LayerStylesCarousel.js
export const slideLeftStyles = (item) => {
    return {
        type: 'SLIDE_LEFT_STYLES',
        id: item.id
    }
}

export const slideRightStyles = (item) => {
    return {
        type: 'SLIDE_RIGHT_STYLES',
        id: item.id
    }
}

export const selectLayerStyle = (item, styleId) => {
    return {
        type: 'SELECT_LAYER_STYLE',
        id: item.id,
        styleId
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

export const showDescription = (layer, sidebarLeftWidth, parentHeight, top) => {
    return {
        type: 'SHOW_DESCRIPTION',
        id: layer.id,
        sidebarLeftWidth,
        parentHeight,
        top
    }
}

export const hideDescription = (layer) => {
    return {
        type: 'HIDE_DESCRIPTION',
        id: layer.id
    }
}

export const updateScrollTop = (scrollTop) => {
    return {
        type: 'UPDATE_SCROLL_TOP',
        scrollTop
    }
}

// on SidebarLeftContainer.js
export const searchLayer = (text) => {
    return {
        type: 'SEARCH_LAYER',
        text
    }
}

export const cleanSearch = () => {
    return {
        type: 'CLEAN_SEARCH'
    }
}

export const hideMenuLayer = () => {
    return {
        type: 'HIDE_MENU_LAYER'
    }
}

// on SidebarRightContainer.js
export const hideSidebarRight = () => {
    return {
        type: 'HIDE_SIDEBAR_RIGHT'
    }
}

export const toggleLayerInformation = (item) => {
    return {
        type: 'TOGGLE_LAYER_INFORMATION',
        id: item.id
    }
}

export const slideLayerUp = (item) => {
    return {
        type: 'SLIDE_LAYER_UP',
        id: item.id
    }
}

export const slideLayerDown = (item) => {
    return {
        type: 'SLIDE_LAYER_DOWN',
        id: item.id
    }
}

export const dropLayer = (dragged, target) => {
    return {
        type: 'DROP_LAYER',
        draggedPosition: dragged.order,
        targetPosition: target.order
    }
}

export const removeAllLayers = () => {
    return {
        type: 'REMOVE_ALL_LAYERS',
    }
}
