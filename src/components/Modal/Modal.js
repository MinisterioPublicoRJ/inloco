import React from 'react'
import DataTable from '../DataTable/DataTable.js'

const Modal = ({ showModal, layers, lastClickData, newsModal, onCloseModal, onGetModalData, onChangeActiveTab, onPaginate }) => {

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

    if (!showModal) {
        return null
    }
    /**
     * @param {Object} data Active layer object
     * This function create and download a custom CSV file with
     * the data of the active layer shown on modal window
     */
    function createCsv(data) {
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF"
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

    // let newsModal = newsModal ? newsModal : null

    if (newsModal) {
        newsModal = false
        return (
            <div className="modal-container">
                <section className="news-modal">
                    <h1 className="modal--title">
                        Últimas atualizações e novidades
                        <span className="modal--close-button" onClick={handleCloseModal}></span>
                    </h1>
                    <ol className="news-modal-list">
                        <li>
                            <figure>
                                <img src={require('../../assets/img/news/funcionalidade.png')} alt="" className="news-modal-list--image" />
                                <figcaption className="news-modal-list--content">
                                    <h3 className="news-modal-list--title">Nova Funcionalidade – Desenho Livre</h3>
                                    <p className="news-modal-list--description">Com esta nova funcionalidade, o usuário pode desenhar e anotar em cima das camadas de exibição facilitando assim a inserção em documento.</p>
                                </figcaption>
                            </figure>
                        </li>
                        <li>
                            <figure>
                                <img src={require('../../assets/img/news/escolas.png')} alt="" className="news-modal-list--image" />
                                <figcaption className="news-modal-list--content">
                                    <h3 className="news-modal-list--title">Nova Camada – “Escolas”</h3>
                                    <p className="news-modal-list--description">Escolas federais, estaduais, municipais e privadas do Estado do Rio de Janeiro. Fonte: Censo escolar da educação básica 2015 (Ministério da Educação/INEP)</p>
                                </figcaption>
                            </figure>
                        </li>

                        <li>
                            <figure>
                                <img src={require('../../assets/img/news/favelas.png')} alt="" className="news-modal-list--image" />
                                <figcaption className="news-modal-list--content">
                                    <h3 className="news-modal-list--title">Nova Camada – “Comunidades”</h3>
                                    <p className="news-modal-list--description">
                                        Limites das Comunidades do Estado do Rio de Janeiro - Fonte: SABREN/IPP - 2014 e Setores de Aglomerados Subnormais do IBGE - Censo 2010.
                                    </p>
                                </figcaption>
                            </figure>
                        </li>

                        <li>
                            <figure>
                                <img src={require('../../assets/img/news/geologia.png')} alt="" className="news-modal-list--image" />
                                <figcaption className="news-modal-list--content">
                                    <h3 className="news-modal-list--title">Nova Camada – “Geologia”</h3>
                                    <p className="news-modal-list--description">
                                    Litologia do Estado do Rio de Janeiro na escala 1:50000
                                </p>
                                </figcaption>
                            </figure>
                        </li>
                    </ol>
                </section>
            </div>
        )
    }

    return (
        <div className="modal-container">
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
                        <button className="modal-options--link">
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
                                                <a key={index} role="button" className="modal-export-list--link" onClick={() => createCsv(selectedLayer)}>
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
        </div>
    )
}

export default Modal
