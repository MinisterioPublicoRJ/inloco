import React from 'react'
import BaseMapList from '../BaseMapList/BaseMapList'
import ExportList from '../ExportList/ExportList'
import GlobalFilter from '../GlobalFilter/GlobalFilter'
import GooglePlacesContainer from '../GooglePlaces/GooglePlacesContainer'
import ShareUrl from '../ShareUrl/ShareUrl'

/**
 * Creates a toolbar menu (one for each toolbar item)
 * @param {object} p An object with parameters
 * @return {string} JSX string
 */
const ToolbarMenu = ({
    item,
    active,
    type,
    layers,
    places,
    mapProperties,
    baseMaps,
    orderByLayerOrder,
    onChangeActiveBaseMap,
    onToolbarItemClick,
    onPlaceClick,
    onOpacityChange,
    onContourChange,
    onKeyUpSearch,
}) => {
    let className = "toolbar-menu"

    if(type === "map") {
        className += " map"
    }

    if(
        (!active || active !== item.name) ||
        item.name === "draw" ||
        item.name === "polygonRequest" ||
        item.name === 'help' ||
        item.name === 'about'
    ) {
        className += " hidden"
    }

    return (
        <div className={className}>
            {
                item.name === 'download' ? <ExportList layers={layers} mapProperties={mapProperties}/> : ''
            }
            {
                item.name === 'share' ? <ShareUrl mapProperties={mapProperties} layers={layers} orderByLayerOrder={orderByLayerOrder} onToolbarItemClick={onToolbarItemClick}/> : ''
            }
            {
                item.name === 'basemaps'
                ? <BaseMapList baseMaps={baseMaps} onChangeActiveBaseMap={onChangeActiveBaseMap} />
                : ''
            }
            {
                item.name === 'search'
                ?   <GlobalFilter
                        onPlaceClick={onPlaceClick}
                        onOpacityChange={onOpacityChange}
                        onContourChange={onContourChange}
                        onKeyUpSearch={onKeyUpSearch}
                        places={places}
                        mapProperties={mapProperties}
                    />
                : ''
            }
            {
                item.name === 'streetView' ?
                    <span>clique no mapa para exibir o street view.</span>
                : ''
            }
            {
                item.name === 'searchStreet' ?
                    <GooglePlacesContainer />
                : ''
            }
        </div>
    )
}

export default ToolbarMenu
