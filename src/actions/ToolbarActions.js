export const addGooglePlacesLatLong = latLong => {
    return {
        type: 'ADD_GOOGLE_PLACES_LAT_LONG',
        latLong,
    }
}

export const addPlaceLayer = item => {
    return {
        type: 'ADD_PLACE_LAYER',
        item,
    }
}

export const addTutelaLayer = item => {
    return {
        type: 'ADD_TUTELA_LAYER',
        item,
    }
}

export const changeActiveBaseMap = (baseMap) => {
    return {
        type: 'CHANGE_ACTIVE_BASE_MAP',
        baseMap,
    }
}

export const changeActiveToolbar = item => {
    return {
        type: 'CHANGE_ACTIVE_TOOLBAR',
        item,
    }
}

export const changeContour = item => {
    return {
        type: 'CHANGE_CONTOUR',
        item,
    }
}

export const changeGlobalFilterType = filterName => {
    return {
        type: 'CHANGE_GLOBAL_FILTER_TYPE',
        filterName,
    }
}

export const changeOpacity = item => {
    return {
        type: 'CHANGE_OPACITY',
        item,
    }
}

export const clearPlaceTutelaLayer = () => {
    return {
        type: 'CLEAR_PLACE_TUTELA_LAYER',
    }
}

export const searchPlaces = item => {
    return {
        type: 'SEARCH_PLACES',
        item,
    }
}

export const searchTutela = item => {
    return {
        type: 'SEARCH_TUTELA',
        item,
    }
}

export const togglePlace = item => {
    return {
        type: 'TOGGLE_PLACE',
        item,
    }
}

export const toggleTutela = item => {
    return {
        type: 'TOGGLE_TUTELA',
        item,
    }
}
