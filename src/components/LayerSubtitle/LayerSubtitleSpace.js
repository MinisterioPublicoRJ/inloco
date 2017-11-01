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

const LayerSubtitleSpace = ({
    layer,
    id,
    connectDropTarget,
    isOver,
    lastClickData,
    onLayerClick,
    onLayerUp,
    onLayerDown,
    onLayerDrop,
    onLayerRemove,
    onOpenModal,
    onIconMouseOver,
    onIconMouseOut,
}) => {
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
                lastClickData={lastClickData}
                onLayerClick={onLayerClick}
                onLayerUp={onLayerUp}
                onLayerDown={onLayerDown}
                onLayerDrop={onLayerDrop}
                onLayerRemove={onLayerRemove}
                onOpenModal={onOpenModal}
                onIconMouseOver={onIconMouseOver}
                onIconMouseOut={onIconMouseOut}
            />
        </div>
    )
}

export default DropTarget("layerSubtitle", subtitleTarget, collect)(LayerSubtitleSpace)
