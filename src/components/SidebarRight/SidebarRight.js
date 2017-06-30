import React from 'react'
import LayerSubtitle from '../LayerSubtitle/LayerSubtitle.js'

const SidebarRight = ({ layers, onLayerClick, orderByLayerOrder, onLayerUp, onLayerDown, onLayerDrag }) => {
    if (!orderByLayerOrder) {
        orderByLayerOrder = () => { return layers }
    }

    return (
        <div className="sidebar-right">
            <div className="layer-list">
                <h1 className="layer-list--title">Camadas em exibição</h1>
                <a className="layer-list--close-button fa fa-times" role="button"></a>
                {layers ?
                    orderByLayerOrder(layers).reverse().map((layer, index) => {
                        return (
                            <LayerSubtitle
                                layer={layer}
                                key={index}
                                onLayerClick={onLayerClick}
                                onLayerUp={onLayerUp}
                                onLayerDown={onLayerDown}
                                onLayerDrag={onLayerDrag}
                            />
                        )
                    })
                : ''}
            </div>
        </div>
    )
}

export default SidebarRight
