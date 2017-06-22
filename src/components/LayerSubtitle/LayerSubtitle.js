import React from 'react';

const LayerSubtitle = ({ layer }) => {

    let layerSubtitleURL = `/geoserver/plataforma/wms?tiled=true&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=${layer.layerName}&STYLE=`

    let description = {
        // replace \n for <br>
        __html: layer.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }

    console.log(layer)
    return (
        <div className="layer-item">
            <div className="layer-item-header">
                <span className="layer-item-header--icon fa fa-ellipsis-v"></span>
                <h2 className="layer-item-header--title">
                    Grupo: {layer.menu2.join(" - ")}
                    <small className="layer-item-header--caption">{layer.title}</small>
                </h2>
                <span className="layer-item-header--icon fa fa-chevron-right"></span>
            </div>
            <img className="layer-item--subtitle" src={layerSubtitleURL} alt=""/>
            <div className="layer-item-more-info">
                <h3 className="layer-item-more-info--title">Sobre</h3>
                <p
                    className="layer-item-more-info--text"
                    dangerouslySetInnerHTML={description}
                ></p>
                <h3 className="layer-item-more-info--title">Estilos da camada</h3>
                <div className="layer-item-styles">
                    <a role="button" className="layer-item-styles--arrow fa fa-chevron-left"></a>
                    <div className="layer-item-styles--list-container">
                        <ul className="layer-item-styles--list">
                            {layer.styles.map((style, indexStyle) => {
                                return (
                                    <li className="layer-item-styles--list-item" key={indexStyle}>
                                        <img className="layer-item-styles--image" src={style.thumb} alt={style.title}/>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                    <a role="button" className="layer-item-styles--arrow fa fa-chevron-right"></a>
                </div>
            </div>
        </div>
    );
};

export default LayerSubtitle;