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
    active,
    baseMaps,
    globalFilterType,
    item,
    mapProperties,
    layers,
    places,
    tutela,
    type,
    onChangeActiveBaseMap,
    onClearPlaceTutelaLayer,
    onContourChange,
    onGlobalFilterTypeChange,
    onKeyUpSearchPlaces,
    onKeyUpSearchTutela,
    onOpacityChange,
    onPlaceClick,
    onToolbarItemClick,
    onTutelaClick,
    onDownloadClick,
    onDownloadEnd,
    orderByLayerOrder,
}) => {
    let className = 'toolbar-menu'

    if (type === 'map') {
        className += ' map'
    }

    if (
        (!active || active !== item.name) ||
        item.name === 'draw' ||
        item.name === 'polygonRequest' ||
        item.name === 'help' ||
        item.name === 'about'
    ) {
        className += ' hidden'
    }

    return (
        <div className={className}>
            {
                item.name === 'download'
                ? <ExportList
                    layers={layers}
                    mapProperties={mapProperties}
                    onDownloadClick={onDownloadClick}
                    onDownloadEnd={onDownloadEnd}
                /> : null
            }
            {
                item.name === 'share'
                ? <ShareUrl
                    layers={layers}
                    mapProperties={mapProperties}
                    orderByLayerOrder={orderByLayerOrder}
                    onToolbarItemClick={onToolbarItemClick}
                /> : null
            }
            {
                item.name === 'basemaps'
                ? <BaseMapList
                    baseMaps={baseMaps}
                    onChangeActiveBaseMap={onChangeActiveBaseMap}
                /> : null
            }
            {
                item.name === 'search'
                ?   <GlobalFilter
                        globalFilterType={globalFilterType}
                        mapProperties={mapProperties}
                        places={places}
                        tutela={tutela}
                        onClearPlaceTutelaLayer={onClearPlaceTutelaLayer}
                        onContourChange={onContourChange}
                        onGlobalFilterTypeChange={onGlobalFilterTypeChange}
                        onKeyUpSearchPlaces={onKeyUpSearchPlaces}
                        onKeyUpSearchTutela={onKeyUpSearchTutela}
                        onOpacityChange={onOpacityChange}
                        onPlaceClick={onPlaceClick}
                        onTutelaClick={onTutelaClick}
                    />
                : ''
            }
            {
                item.name === 'streetView' ?
                    <span>clique no mapa para exibir o street view.</span>
                : null
            }
            {
                item.name === 'searchStreet' ?
                    <GooglePlacesContainer />
                : null
            }
        </div>
    )
}

export default ToolbarMenu
