import React from 'react'
import LayerSubtitle from '../LayerSubtitle/LayerSubtitle.js'
import { DropTarget } from 'react-dnd'

const subtitleTarget = {
    drop(props, monitor) {
        return {target: props.layer}
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

const LayerSubtitleSpace = ({ layer, id, onLayerClick, onLayerUp, onLayerDown, onLayerDrop, onLayerRemove, connectDropTarget, isOver, onOpenModal }) => {
    function over() {
        if (isOver){
            return {
                zIndex: 1,
                opacity: 0.5,
                backgroundColor: 'yellow',
            }
        }
        return {}
    }

    return connectDropTarget(
        <div
            className="layer-item-space"
            key={id}
            style={over()}
        >
            <LayerSubtitle
                layer={layer}
                key={id}
                onLayerClick={onLayerClick}
                onLayerUp={onLayerUp}
                onLayerDown={onLayerDown}
                onLayerDrop={onLayerDrop}
                onLayerRemove={onLayerRemove}
                onOpenModal={onOpenModal}
            />
        </div>
    )
}

export default DropTarget("layerSubtitle", subtitleTarget, collect)(LayerSubtitleSpace)
