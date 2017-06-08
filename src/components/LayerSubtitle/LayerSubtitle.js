import React from 'react';

const LayerSubtitle = () => {
    return (
        <div className="layer-item">
            <div className="layer-item-header">
                <span className="layer-item-header--icon fa fa-ellipsis-v"></span>
                <h2 className="layer-item-header--title">
                    Grupo: Geologia
                    <small className="layer-item-header--caption">Litologia do estado do Rio de Janeiro</small>
                </h2>
                <span className="layer-item-header--icon fa fa-chevron-right"></span>
            </div>
            <img className="layer-item--subtitle" src="/geoserver/plataforma/wms?tiled=true&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=plataforma:amb_geomorf_50k&STYLE=" alt=""/>
            <div className="layer-item-more-info">
                <h3 className="layer-item-more-info--title">Sobre</h3>
                <p className="layer-item-more-info--text">Escolas da rede federal, estadual, municipal e privada.(...)</p>
                <h3 className="layer-item-more-info--title">Estilos da camada</h3>
                <div className="layer-item-styles">
                    <a role="button" className="layer-item-styles--arrow fa fa-chevron-left"></a>
                    <div className="layer-item-styles--list-container">
                        <ul className="layer-item-styles--list">
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                            <li className="layer-item-styles--list-item">
                                <img className="layer-item-styles--image" src="" alt=""/>
                            </li>
                        </ul>
                    </div>
                    <a role="button" className="layer-item-styles--arrow fa fa-chevron-right"></a>
                </div>
            </div>
        </div>
    );
};

export default LayerSubtitle;
