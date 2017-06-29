import React from 'react'
import LayerStylesCarouselContainer from '../LayerStylesCarousel/LayerStylesCarouselContainer.js'

const LayerSubtitle = ({ layer, onLayerClick, onLayerUp, onLayerDown, onLayerDrag }) => {

    let layerSubtitleURL = layer ? `/geoserver/plataforma/wms?tiled=true&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=${layer.layerName}&STYLE=` : ''

    let description = {
        // replace \n for <br>
        __html: layer ? layer.description.replace(/(?:\r\n|\r|\n)/g, '<br />') : ''
    }

    function handleItemClick() {
        return onLayerClick(layer)
    }

    function handleLayerUp() {
        return onLayerUp(layer)
    }

    function handleLayerDown() {
        return onLayerDown(layer)
    }

    let layerItemClassName = 'layer-item'
    if (layer && layer.showInformation) {
        layerItemClassName += ' selected'
    }

    return (
        <div className={layerItemClassName}>
            <div className="layer-item-header" onClick={
                (layer) => handleItemClick()
            }>
                <span className="layer-item-header--icon fa fa-ellipsis-v"></span>
                <h2 className="layer-item-header--title">
                    Grupo: {layer ? layer.menu2.join(" - ") : ''}
                    <small className="layer-item-header--caption">{layer ? layer.title : ''}</small>
                </h2>
                <span className="layer-item-header--icon fa chevron"></span>
            </div>
            <p>
                <button onClick={
                    (layer) => handleLayerUp()
                }>/\</button>
                {layer ? layer.order : ''}
                <button onClick={
                    (layer) => handleLayerDown()
                }>\/</button>
            </p>
            <img className="layer-item--subtitle" src={layerSubtitleURL} alt=""/>
            <div className="layer-item-more-info">
                <h3 className="layer-item-more-info--title">Exibições da camada</h3>
                <LayerStylesCarouselContainer layer={layer}/>
                <h3 className="layer-item-more-info--title">Sobre</h3>
                <p
                    className="layer-item-more-info--text"
                    dangerouslySetInnerHTML={description}
                ></p>
            </div>
        </div>
    )
}

export default LayerSubtitle
