import React from 'react'
import About from './Contents/About.js'
import Table from './Contents/Table.js'
import News from './Contents/News.js'

const Modal = ({
    showModal,
    layers,
    lastClickData,
    newsModal,
    showAbout,
    onCloseModal,
    onGetModalData,
    onChangeActiveTab,
    onPaginate,
}) => {

    let ContentComponent =
        <Table
            layers={layers}
            handleCloseModal={handleCloseModal}
            onGetModalData={onGetModalData}
            onChangeActiveTab={onChangeActiveTab}
            onPaginate={onPaginate}
        />
    let sectionClassName = "modal"
    let modalTitle = "Tabela de Registros"

    function handleCloseModal() {
        return onCloseModal()
    }

    if (!showModal) {
        return null
    }

    if (newsModal) {
        newsModal = false
        sectionClassName = "news-modal"
        modalTitle = "Últimas atualizações e novidades"

        ContentComponent =
            <News handleCloseModal={handleCloseModal} />
    }

    if (showAbout) {
        sectionClassName = "about-modal"
        modalTitle = "Sobre"
        ContentComponent =
            <About handleCloseModal={handleCloseModal} />
    }

    return (
        <div className="modal-container">
            <section className={sectionClassName}>
                <h1 className="modal--title">
                    {modalTitle}
                    <span className="modal--close-button" onClick={handleCloseModal}></span>
                </h1>
                {ContentComponent}
            </section>
        </div>
    )
}

export default Modal
