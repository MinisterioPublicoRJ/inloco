import React from 'react'
import LayerStylesCarouselContainer from '../LayerStylesCarousel/LayerStylesCarouselContainer.js'

const LayerSubtitle = ({ layer, onLayerClick }) => {

    let layerSubtitleURL = `/geoserver/plataforma/wms?tiled=true&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=${layer.layerName}&STYLE=`

    let description = {
        // replace \n for <br>
        __html: layer.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }

    function handleItemClick() {
        return onLayerClick(layer)
    }

    let layerItemClassName = 'layer-item'
    if (layer.showInformation) {
        layerItemClassName += ' selected'
    }

    return (
        <div className={layerItemClassName}>
            <div className="layer-item-header" onClick={
                (layer) => handleItemClick()
            }>
                <span className="layer-item-header--icon fa fa-ellipsis-v"></span>
                <h2 className="layer-item-header--title">
                    Grupo: {layer.menu2.join(" - ")}
                    <small className="layer-item-header--caption">{layer.title}</small>
                </h2>
                <span className="layer-item-header--icon fa chevron"></span>
            </div>
            <p>{layer.order}</p>
            <img className="layer-item--subtitle" src={layerSubtitleURL} alt=""/>
            <div className="layer-item-more-info">
                <h3 className="layer-item-more-info--title">Sobre</h3>
                <p
                    className="layer-item-more-info--text"
                    dangerouslySetInnerHTML={description}
                ></p>
                <h3 className="layer-item-more-info--title">Estilos da camada</h3>
                <LayerStylesCarouselContainer layer={layer}/>
            </div>
        </div>
    )
}

export default LayerSubtitle
