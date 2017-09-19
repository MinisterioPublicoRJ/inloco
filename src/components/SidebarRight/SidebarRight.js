import React from 'react'
import LayerSubtitleSpace from '../LayerSubtitle/LayerSubtitleSpace.js'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

const SidebarRight = ({
    layers,
    showSidebarRight,
    onLayerClick,
    orderByLayerOrder,
    onLayerUp,
    onLayerDown,
    onLayerDrop,
    onSidebarRightHideClick,
    onLayerRemove,
    onRemoveAllLayers,
    onOpenModal,
    lastClickData,
    polygonData,
}) => {
    if (!orderByLayerOrder) {
        orderByLayerOrder = () => { return layers }
    }

    // define base class of element
    var cssClass = 'sidebar-right allow-transition-sidebar-right'
    // if showSidebarRight is false, add class to hide the element
    if (!showSidebarRight) {
        cssClass += ' hide-sidebar-right'
    }
    return (
        <div className={cssClass}>
            <div className="layer-list">
                <h1 className="layer-list--title">Camadas em exibição</h1>
                <button
                    className="layer-list--remove-all-layers-button"
                    onClick={onRemoveAllLayers}
                    aria-label="Remover todas as camadas"
                >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
                <a
                    className="layer-list--close-button fa fa-times"
                    onClick={onSidebarRightHideClick}
                    role="button"
                    aria-label="Fechar painel"
                ></a>
                <div className="layer-item-space-container">
                    {
                        polygonData
                        ?
                        <div className="layer-item selected">
                            <div className="layer-item-header">
                                <h2 className="layer-item-header--title">
                                    Dados do polígono
                                </h2>
                            </div>
                            <div className="layer-item-body">
                                {
                                    polygonData.map( (l, index) => {
                                        let title = l.category
                                        let value = l.items.length
                                        if(l.category === "População"){
                                            value = l.populacao_total
                                        }
                                        return (
                                            <div key={index}>
                                                <h3 className="layer-item-more-info--title">{title}</h3>
                                                <p className="layer-item-more-info--style-title">{value}</p>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>

                        :
                        null
                    }
                    {layers ?
                        orderByLayerOrder(layers).reverse().map((layer, index) => {
                            return (
                                <LayerSubtitleSpace
                                    layer={layer}
                                    key={index}
                                    onLayerClick={onLayerClick}
                                    onLayerUp={onLayerUp}
                                    onLayerDown={onLayerDown}
                                    onLayerDrop={onLayerDrop}
                                    onLayerRemove={onLayerRemove}
                                    onOpenModal={onOpenModal}
                                    lastClickData={lastClickData}
                                />
                            )
                        })
                    : ''}
                </div>
            </div>
        </div>
    )
}
// need to wrap the top most component of your application
// to make children draggable with DragDropContext (set up React DnD).
export default DragDropContext(HTML5Backend)(SidebarRight)
