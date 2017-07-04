import React from 'react'
import LayerSubtitleSpace from '../LayerSubtitle/LayerSubtitleSpace.js'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

const SidebarRight = ({
    layers,
    showSidebarRight,
    onLayerClick,
    orderByLayerOrder,
    onLayerUp,
    onLayerDown,
    onLayerDrop,
    onSidebarRightHideClick,
    onLayerRemove
}) => {
    if (!orderByLayerOrder) {
        orderByLayerOrder = () => { return layers }
    }

    // define base class of element
    var cssClass = 'sidebar-right allow-transition-sidebar-right'
    // if showSidebarRight is false, add class to hide the element
    if (!showSidebarRight) {
        cssClass += ' hide-sidebar-right'
    }
    return (
        <div className={cssClass}>
            <div className="layer-list">
                <h1 className="layer-list--title">Camadas em exibição</h1>
                <a className="layer-list--close-button fa fa-times" onClick={onSidebarRightHideClick} role="button"></a>
                <div className="layer-item-space-container">
                    {layers ?
                        orderByLayerOrder(layers).reverse().map((layer, index) => {
                            return (
                                <LayerSubtitleSpace
                                    layer={layer}
                                    key={index}
                                    onLayerClick={onLayerClick}
                                    onLayerUp={onLayerUp}
                                    onLayerDown={onLayerDown}
                                    onLayerDrop={onLayerDrop}
                                    onLayerRemove={onLayerRemove}
                                />
                            )
                        })
                    : ''}
                </div>
            </div>
        </div>
    )
}
// need to wrap the top most component of your application
// to make children draggable with DragDropContext (set up React DnD).
export default DragDropContext(HTML5Backend)(SidebarRight)
