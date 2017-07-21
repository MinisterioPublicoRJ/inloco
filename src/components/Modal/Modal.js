import React from 'react'
import DataTable from '../DataTable/DataTable.js'

const Modal = ({ showModal, layers, lastClickData, onCloseModal, onGetModalData, onChangeActiveTab, onPaginate, onToggleExportFile }) => {

    function handleCloseModal() {
        return onCloseModal()
    }

    function handleGetModalData(layer, lastClickData) {
        return onGetModalData(layer, lastClickData)
    }

    function handleChangeActiveTab(layer) {
        return onChangeActiveTab(layer)
    }

    function handlePaginate(layer, page) {
        return onPaginate(layer, page)
    }

    function handleToggleExportFile() {
        return onToggleExportFile()
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
        if (layer.modal && layer.modal.activeLayer) {
            // Found active layer
            selectedLayer = layer
            if (!layer.modal.pages) {
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
                        if (layer.modal.activeLayer) {
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
            {selectedLayer.modal.pages ?
                <DataTable layer={selectedLayer} isCollapsed={false} handlePaginate={handlePaginate}/>
                : ''
            }
            <ul className="modal-options">
                <li className="modal-options--export">
                    <button className="modal-options--link" onClick={handleToggleExportFile}>
                        salvar
                        <span className="modal-options--icon fa fa-chevron-down"></span>
                    </button>
                    <ul className="modal-export-list">
                        <li>
                            <a href="#" className="modal-export-list--link">
                                Planilha
                                <span className="modal-export-list--extension">(csv)</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="modal-export-list--link">
                                Google Earth
                                <span className="modal-export-list--extension">(kml)</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="modal-export-list--link">
                                Shape File
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="modal-options--back">
                    <button className="modal-options--link" onClick={handleCloseModal}>
                        voltar
                    </button>
                </li>
            </ul>
        </section>
    )
}

export default Modal
