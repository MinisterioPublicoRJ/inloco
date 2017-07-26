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
        return onChangeActiveTab(layer, lastClickData)
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
    /**
     * @param {Object} data Active layer object
     * This function create and download a custom CSV file with
     * the data of the active layer shown on modal window
     */
    function createCsv(data) {
        let csvContent = "data:text/csv;charset=utf-8,"
        let titleArray = []
        let contentArray = []
        let titleData = ""
        let csvData = ""
        let link
        let encodeUri

        // Get the title line from the first entry of the object
        titleArray = Object.keys(data.modal.pages[0][0].properties)
        for(let i = 0; i < titleArray.length; i++) {
            titleData += `${titleArray[i]};`
        }
        titleData += "\n"

        // Get the content lines from the objects
        data.modal.pages.forEach(page => {
            page.forEach(p => {
                contentArray = Object.values(p.properties)
                for(let i = 0; i < contentArray.length; i++) {
                    csvData += `${contentArray[i]};`
                }
                csvData += "\n"
            })
        })
        csvContent += titleData
        csvContent += csvData
        encodeUri = encodeURI(csvContent)

        // Fake a anchor tag and link to create a custom name for the file and delete it after use
        link = document.createElement('a');
        link.setAttribute('href', encodeUri);
        link.setAttribute('download', "dados_mapa.csv");
        link.click();
    }

    const selectedLayers = layers.filter(l => l.selected)
    let selectedLayer

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
                            selectedLayer = layer
                        }

                        return (
                            <li className="modal-layer-list--item" key={index}>
                                <a role="button" download="dados_tabela.csv" className={className} onClick={() => handleChangeActiveTab(layer)}>
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
                            {
                                selectedLayers.map((layer, index) => {
                                    if (layer.modal.activeLayer) {
                                        selectedLayer = layer

                                        return (
                                            <a role="button" className="modal-export-list--link" onClick={() => createCsv(selectedLayer)}>
                                                Planilha
                                                <span className="modal-export-list--extension">(csv)</span>
                                            </a>
                                        )
                                    }
                                })
                            }
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
