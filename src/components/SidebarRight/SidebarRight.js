import React from 'react';
import LayerSubtitle from '../LayerSubtitle/LayerSubtitle.js';

const SidebarRight = () => {
    return (
        <div className="sidebar-right">
            <div className="layer-list">
                <h1 className="layer-list--title">Camadas</h1>
                <a className="layer-list--close-button fa fa-times" role="button"></a>
                <LayerSubtitle />
            </div>
        </div>
    );
};

export default SidebarRight;
