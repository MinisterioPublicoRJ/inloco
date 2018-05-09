import React from 'react'
import ToolbarMenu from '../ToolbarMenu/ToolbarMenu'

const Toolbar = ({
    baseMaps,
    globalFilterType,
    layers,
    loginStatus,
    mapProperties,
    places,
    showSidebarRight,
    toolbarActive,
    tutela,
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
    ownProps,
}) => {
    let className
    let tooltipClassName = 'tooltip'
    let active
    let { type, items } = ownProps

    if (type === 'platform') {
        className = 'platform-toolbar'
        tooltipClassName += ' bottom'
    }
    if (type === 'map') {
        className = 'map-toolbar'
        tooltipClassName += ' top'
    }
    if (!items) {
        return null
    }
    if (showSidebarRight) {
        className += ' sidebar-left-opened'
    }

    if (toolbarActive) {
        active = toolbarActive
    }

    if (loginStatus) {
        items = items.map((item) => {
            if (item.name === 'login') {
                item.className = 'fa fa-sign-out login-logout login'
                item.tooltip = 'Logout'
                item.name = 'logout'
            }
            return item
        })
    } else {
        items = items.map(item => {
            if (item.name === 'logout') {
                item.className = 'fa fa-sign-in login-logout login'
                item.tooltip = 'Login'
                item.name = 'login'
            }
            return item
        })
    }

    function handleClick(e){
        if (e.target.classList.contains('toolbar-item')) {
            onToolbarItemClick(e.target.dataset.id)
        }
    }
    return (
        // the data-html2canvas-ignore attribute tells html2canvas to ignore rendering this element on image capture
        <div className={className} data-html2canvas-ignore={true}>
            {
                items.map( (item, index) => {
                    var itemClassName = 'toolbar-item ' + item.className
                    if (active === item.name) {
                        itemClassName += ' active'
                    }

                    // focus on searchStreet box manually
                    if (item.name === 'searchStreet' && active === 'searchStreet') {
                        setTimeout(() => {
                            document.getElementById('GooglePlacesSearch').focus()
                        }, 200)
                    }

                    return (
                        <div
                            data-id={item.name}
                            key={index}
                            className={itemClassName}
                            onClick={e => handleClick(e)}
                        >
                            <ToolbarMenu
                                active={active}
                                baseMaps={baseMaps}
                                globalFilterType={globalFilterType}
                                item={item}
                                layers={layers}
                                mapProperties={mapProperties}
                                places={places}
                                type={type}
                                tutela={tutela}
                                onChangeActiveBaseMap={onChangeActiveBaseMap}
                                onClearPlaceTutelaLayer={onClearPlaceTutelaLayer}
                                onContourChange={onContourChange}
                                onGlobalFilterTypeChange={onGlobalFilterTypeChange}
                                onKeyUpSearchPlaces={onKeyUpSearchPlaces}
                                onKeyUpSearchTutela={onKeyUpSearchTutela}
                                onOpacityChange={onOpacityChange}
                                onPlaceClick={onPlaceClick}
                                onToolbarItemClick={onToolbarItemClick}
                                onTutelaClick={onTutelaClick}
                                onDownloadClick={onDownloadClick}
                                onDownloadEnd={onDownloadEnd}
                                orderByLayerOrder={ownProps.orderByLayerOrder}
                            >
                            </ToolbarMenu>
                            <span className={tooltipClassName}>{item.tooltip}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Toolbar
