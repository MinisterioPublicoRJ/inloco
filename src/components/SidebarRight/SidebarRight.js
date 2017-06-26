import React from 'react';
import LayerSubtitle from '../LayerSubtitle/LayerSubtitle.js';

const SidebarRight = ({ layers, onLayerClick, orderByLayerOrder }) => {
    return (
        <div className="sidebar-right">
            <div className="layer-list">
                <h1 className="layer-list--title">Camadas</h1>
                <a className="layer-list--close-button fa fa-times" role="button"></a>
                {orderByLayerOrder(layers).reverse().map((layer, index) => {
                    return (
                        <LayerSubtitle
                            layer={layer}
                            key={index}
                            onLayerClick={onLayerClick}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default SidebarRight;
