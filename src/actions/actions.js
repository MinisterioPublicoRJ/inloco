// on App.js
export const populateApp = (xmlData, hash) => {
    return {
        type: 'POPULATE_APP',
        xmlData,
        hash,
    }
}

export const populatePlaces = (xmlData) => {
    return {
        type: 'POPULATE_PLACES',
        xmlData: xmlData
    }
}

// on HeaderContainer.js
export const showMenuLayer = () => {
    return {
        type: 'SHOW_MENU_LAYER',
    }
}

export const showSidebarRight = () => {
    return {
        type: 'SHOW_SIDEBAR_RIGHT',
    }
}

// on LayerStylesCarousel.js
export const slideLeftStyles = (item) => {
    return {
        type: 'SLIDE_LEFT_STYLES',
        id: item.id,
    }
}

export const slideRightStyles = (item) => {
    return {
        type: 'SLIDE_RIGHT_STYLES',
        id: item.id,
    }
}

export const selectLayerStyle = (item, styleId) => {
    return {
        type: 'SELECT_LAYER_STYLE',
        id: item.id,
        styleId,
    }
}

//on LeafletMapContainer.js
export const populateStateWithLayerData = (data) => {
    return {
        type: 'POPULATE_STATE_WITH_LAYER_DATA',
        data,
    }
}

export const updateLastClickData = (data) => {
    return {
        type: 'UPDATE_LAST_CLICK_DATA',
        data,
    }
}

export const updateBasemapLoadingStatus = () => {
    return {
        type: 'UPDATE_BASEMAP_LOADING_STATUS',
    }
}

export const lastMapPosition = (data) => {
    return {
        type: 'LAST_MAP_POSITION',
        data,
    }
}

export const populateStateWithPolygonData = (data) => {
    return {
        type: 'POPULATE_STATE_WITH_POLYGON_DATA',
        data,
    }
}

// on MenuContainer.js
export const toggleLayer = (item) => {
    return {
        type: 'TOGGLE_LAYER',
        id: item.id,
    }
}

export const toggleMenu = (item) => {
    return {
        type: 'TOGGLE_MENU',
        id: item.id,
        selected: item.selected,
    }
}

export const untoggleAll = () => {
    return {
        type: 'UNTOGGLE_MENUS',
    }
}

export const showDescription = (layer, sidebarLeftWidth, mouseY) => {
    return {
        type: 'SHOW_DESCRIPTION',
        id: layer.id,
        sidebarLeftWidth,
        mouseY,
    }
}

export const hideDescription = (layer) => {
    return {
        type: 'HIDE_DESCRIPTION',
        id: layer.id,
    }
}

export const updateScrollTop = (scrollTop) => {
    return {
        type: 'UPDATE_SCROLL_TOP',
        scrollTop,
    }
}

// on SidebarLeftContainer.js
export const searchLayer = (text) => {
    return {
        type: 'SEARCH_LAYER',
        text,
    }
}

export const cleanSearch = () => {
    return {
        type: 'CLEAN_SEARCH',
    }
}

export const hideMenuLayer = () => {
    return {
        type: 'HIDE_MENU_LAYER',
    }
}

// on SidebarRightContainer.js
export const hideSidebarRight = () => {
    return {
        type: 'HIDE_SIDEBAR_RIGHT',
    }
}

export const toggleLayerInformation = (item) => {
    return {
        type: 'TOGGLE_LAYER_INFORMATION',
        id: item.id,
    }
}

export const slideLayerUp = (item) => {
    return {
        type: 'SLIDE_LAYER_UP',
        id: item.id,
    }
}

export const slideLayerDown = (item) => {
    return {
        type: 'SLIDE_LAYER_DOWN',
        id: item.id,
    }
}

export const dropLayer = (dragged, target) => {
    return {
        type: 'DROP_LAYER',
        draggedPosition: dragged.order,
        targetPosition: target.order,
    }
}

export const removeAllLayers = () => {
    return {
        type: 'REMOVE_ALL_LAYERS',
    }
}

export const openModal = (layer) => {
    return {
        type: 'OPEN_MODAL',
        layer,
    }
}

// on ModalContainer.js
export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL',
    }
}

export const getModalData = (data) => {
    return {
        type: 'GET_MODAL_DATA',
        data,
    }
}

export const changeActiveTab = (layer) => {
    return {
        type: 'CHANGE_ACTIVE_TAB',
        layer,
    }
}

// On Pagination
export const paginate = (layer, page) => {
    return {
        type: 'PAGINATE',
        layer,
        page,
    }
}

// on toolbar container
export const changeActiveToolbar = (item) => {
    return {
        type: 'CHANGE_ACTIVE_TOOLBAR',
        item,
    }
}

export const togglePlace = (item) => {
    return {
        type: "TOGGLE_PLACE",
        item,
    }
}

export const addPlaceLayer = (item) => {
    return {
        type: "ADD_PLACE_LAYER",
        item,
    }
}

export const changeOpacity = (item) => {
    return {
        type: "CHANGE_OPACITY",
        item,
    }
}

export const changeContour = (item) => {
    return {
        type: "CHANGE_CONTOUR",
        item,
    }
}

export const searchPlaces = (item) => {
    return {
        type: "SEARCH_PLACES",
        item,
    }
}

export const changeActiveBaseMap = (baseMap) => {
    return {
        type: 'CHANGE_ACTIVE_BASE_MAP',
        baseMap,
    }
}
