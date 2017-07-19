import React from 'react'
import DataTable from '../DataTable/DataTable.js'

const Modal = ({ showModal, layers, lastClickData, onCloseModal, onGetModalData, onChangeActiveTab }) => {

    function handleCloseModal() {
        return onCloseModal()
    }

    function handleGetModalData(layer, lastClickData) {
        return onGetModalData(layer, lastClickData)
    }

    function handleChangeActiveTab(layer) {
        return onChangeActiveTab(layer)
    }


    if (!showModal) {
        return null
    }

    const selectedLayers = layers.filter(l => l.selected)
    let selectedLayer

    /**
     * Find active layer on array and check for the property modalFeature.
     * If exists, show table, else call GeoAPI
     */

    selectedLayers.map((layer, index) => {
        if (layer.modalActiveLayer) {
            // Found active layer
            selectedLayer = layer
            if (!layer.modalFeatures) {
                // Call AJAX
                handleGetModalData(layer, lastClickData)
            }
        }
    })

    return (
        <section className="modal">
            <h1 className="modal--title">
                Tabela de registros
                <span className="modal--close-button" onClick={handleCloseModal}></span>
            </h1>
            <ul className="modal-layer-list">
                {
                    selectedLayers.map((layer, index) => {
                        let className = "modal-layer-list--link"
                        if (layer.modalActiveLayer) {
                            className += ' active'
                        }

                        return (
                            <li className="modal-layer-list--item" key={index}>
                                <a role="button" className={className} onClick={() => handleChangeActiveTab(layer)}>
                                    {layer.title}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            {selectedLayer.modalFeatures ?
                <DataTable layer={selectedLayer} isCollapsed={false}/>
                : ''
            }

            {/*<div className="">Table of contents</div>
            <div className="modal-footer">
                <ul className="modal-pagination">
                    <li className="modal-pagination--item">
                        <a className="modal-pagination--link" role="button">v</a>
                    </li>
                    <li className="modal-pagination--item">
                        <a className="modal-pagination--link active" role="button">1</a>
                    </li>
                    <li className="modal-pagination--item">
                        <a className="modal-pagination--link" role="button">2</a>
                    </li>
                    <li className="modal-pagination--item">
                        <a className="modal-pagination--link" role="button">a</a>
                    </li>
                </ul>
                <ul className="modal-options">
                    <li className="modal-options--export">
                        <a className="modal-options--link" role="button">
                            salvar
                            <span className="modal-options--icon fa fa-chevron-down"></span>
                        </a>
                    </li>
                    <li className="modal-options--back">
                        <a className="modal-options--link" role="button">
                            voltar
                        </a>
                    </li>
                </ul>
            </div>*/}
        </section>
    )
}

export default Modal
