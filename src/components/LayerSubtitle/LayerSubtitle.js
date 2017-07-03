import React from 'react'
import DataTable from '../DataTable/DataTable.js'
import LayerStylesCarouselContainer from '../LayerStylesCarousel/LayerStylesCarouselContainer.js'
import { DragSource } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


const layerSubtitleSource = {
    beginDrag(props) {
        return {id: props.layer.key}
    },
    endDrag(props, monitor) {
        let dragged = props.layer
        let target = monitor.getDropResult().target
        props.onLayerDrop(dragged, target)
    },
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const LayerSubtitle = ({ layer, onLayerClick, onLayerUp, onLayerDown, onLayerDrop , connectDragSource, isDragging}) => {
    let layerSubtitleURL = `/geoserver/plataforma/wms?tiled=true&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=${layer.layerName}&STYLE=`

    let description = {
        // replace \n for <br>
        __html: layer.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
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
    if (layer.showInformation) {
        layerItemClassName += ' selected'
    }

    return connectDragSource(
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
            <p>
                <button onClick={
                    (layer) => handleLayerUp()
                }>/\</button>
                {layer.order}
                <button onClick={
                    (layer) => handleLayerDown()
                }>\/</button>
            </p>
            <img className="layer-item--subtitle" src={layerSubtitleURL} alt=""/>
            <div className="layer-item-data">
                <h3 className="layer-item-data--title">Dados do registro</h3>
                <div className="layer-item-data--shade"></div>
                <DataTable/>
                <a role="button" className="layer-item-data--icon"></a>
                <a role="button" className="layer-item-data--more-info">ver mais</a>
            </div>
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

// Set component as a drag source. It says that it is draggable.
// We also need to pass three parameters: "layerSubtitle" is a string
// that works as an id to match source with destiny.
export default DragSource("layerSubtitle", layerSubtitleSource, collect)(LayerSubtitle)
