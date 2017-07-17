import React from 'react'
import DataTable from '../DataTable/DataTable.js'

const Modal = () => {
    return (
        <section className="modal">
            <h1 className="modal--title">Tabela de registros</h1>
            <ul className="modal-layer-list">
                <li className="modal-layer-list--item">
                    <a role="button" className="modal-layer-list--link active">Escolas (BASE PARCIAL)</a>
                </li>
                <li className="modal-layer-list--item">
                    <a role="button" className="modal-layer-list--link">Escolas (BASE PARCIAL)</a>
                </li>
                <li className="modal-layer-list--item">
                    <a role="button" className="modal-layer-list--link">Escolas (BASE PARCIAL)</a>
                </li>
                <li className="modal-layer-list--item">
                    <a role="button" className="modal-layer-list--link">Escolas (BASE PARCIAL)</a>
                </li>
            </ul>
            <div className="">Table of contents</div>
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
            </div>
        </section>
    )
}

export default Modal
