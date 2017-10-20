import React from 'react'
import About from './Contents/About.js'
import Table from './Contents/Table.js'
import News from './Contents/News.js'
import Login from './Contents/Login.js'

const Modal = ({
    showModal,
    layers,
    lastClickData,
    showLogin,
    loginStatus,
    loginError,
    newsModal,
    showAbout,
    onCloseModal,
    onGetModalData,
    onChangeActiveTab,
    onPaginate,
    onLoginClick,
}) => {

    function handleCloseModal() {
        return onCloseModal()
    }

    let ContentComponent =
        <Table
            layers={layers}
            onGetModalData={onGetModalData}
            onChangeActiveTab={onChangeActiveTab}
            onPaginate={onPaginate}
            onCloseModal={handleCloseModal}
        />
    let sectionClassName = "modal"
    let modalTitle = "Tabela de Registros"

    if (!showModal) {
        return null
    }

    if (newsModal) {
        newsModal = false
        sectionClassName = "news-modal"
        modalTitle = "Últimas atualizações e novidades"

        ContentComponent = <News />
    }

    if (showLogin) {
        sectionClassName = "login-modal"
        modalTitle = "Login"

        ContentComponent = <Login onLoginClick={onLoginClick} loginError={loginError} loginStatus={loginStatus}/>
    }

    if (showAbout) {
        sectionClassName = "about-modal"
        modalTitle = "Sobre"
        ContentComponent = <About />
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
