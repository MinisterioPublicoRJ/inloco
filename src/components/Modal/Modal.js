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
                    <span className="intro"> Bem-vindo a plataforma de mapas interativos do  inLoco 2.0! A nova plataforma é moderna e intuitiva e permite ao usuário visualizar e sobrepor dados geográficos de diversos assuntos, realizar buscas e dispor de diversas informações. Além das consultas de sempre, essa ferramenta traz de forma acessível novas funcionalidades e está disponível para uso no seu dia a dia: </span>
                    <ol className="news-modal-list">
                        <li>
                            <strong> Desenho livre </strong> – É uma ferramenta rápida e fácil que permite que você desenhe ou demarque um ponto de interesse ou áreas relevantes no mapa.
                        </li>
                        <li>
                            <strong> Busca por polígono ou área </strong> – Facilita a busca de uma área fechada em determinada região e a descreve com varias informações num raio de distância definido no mapa.
                        </li>

                        <li>
                            <strong> Busca de endereço  </strong> – É um serviço que permite buscar um endereço ou um ponto de interesse, através de uma busca textual.
                        </li>

                        <li>
                            <strong> Mudar a camada de fundo </strong> – É possível alterar o estilo de plano de fundo do mapa oferecendo imagens por satélite, terrenos ou logradouros do Estado do Rio de Janeiro.
                        </li>

                        <li>
                            <strong> Google Street View </strong> – A nova ferramenta agora está integrada ao Street View, que é um recurso do Google. Ela disponibiliza vistas panorâmicas de 360° e permite que os usuários vejam partes de algumas regiões ao nível do chão/solo.
                        </li>
                    </ol>
                    {/*
                    * Date.now of last update
                    */}
                    <div className="modal-options--back">
                        <button id="newsTimestamp" className="modal-options--link" data-value="1505847454072" onClick={handleCloseModal}>
                            Fechar e não exibir novamente
                        </button>
                    </div>
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
                            if (layer && layer.modal && layer.modal.activeLayer) {
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
                {selectedLayer && selectedLayer.modal && selectedLayer.modal.pages ?
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
