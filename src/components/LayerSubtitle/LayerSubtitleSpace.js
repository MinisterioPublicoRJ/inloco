import React from 'react'
import LayerSubtitle from '../LayerSubtitle/LayerSubtitle.js'

const LayerSubtitleSpace = ({ layer, id, onLayerClick, onLayerUp, onLayerDown, onLayerDrag , connectDragSource, isDragging}) => {

    return (
        <LayerSubtitle
            layer={layer}
            key={id}
            onLayerClick={onLayerClick}
            onLayerUp={onLayerUp}
            onLayerDown={onLayerDown}
            onLayerDrag={onLayerDrag}
        />
    )
}

export default LayerSubtitleSpace
