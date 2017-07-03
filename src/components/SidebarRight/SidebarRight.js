import React from 'react'
import LayerSubtitleSpace from '../LayerSubtitle/LayerSubtitleSpace.js'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

const SidebarRight = ({ layers, onLayerClick, orderByLayerOrder, onLayerUp, onLayerDown, onLayerDrop }) => {
    return (
        <div className="sidebar-right">
            <div className="layer-list">
                <h1 className="layer-list--title">Camadas em exibição</h1>
                <a className="layer-list--close-button fa fa-times" role="button"></a>
                {orderByLayerOrder(layers).reverse().map((layer, index) => {
                    return (
                        <LayerSubtitleSpace
                            layer={layer}
                            key={layer.id}
                            id={index}
                            onLayerClick={onLayerClick}
                            onLayerUp={onLayerUp}
                            onLayerDown={onLayerDown}
                            onLayerDrop={onLayerDrop}
                        />
                    )
                })}
            </div>
        </div>
    )
}
// need to wrap the top most component of your application
// to make children draggable with DragDropContext (set up React DnD).
export default DragDropContext(HTML5Backend)(SidebarRight)
