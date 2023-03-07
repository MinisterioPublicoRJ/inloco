import React from 'react'

const Loading = ({ layers, showLoader, downloadLoader }) => {

    let loadingClass = 'module-loading'
    {/*if (!showLoader && showLoader !== undefined) {
        loadingClass += ' hidden'
    }

    if (downloadLoader && downloadLoader === true) {
        loadingClass = 'module-loading'
    }*/}

    return (
        <div className={loadingClass}>
            <div className="spinner">
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i><br />
                Este site está sendo descontinuado por favor acesse nosso no site aqui :{" "}
                <a href="http://no.mprj.mp.br/gestaodoterritoriopub">HUB Gestão do Território</a>
            </div>
        </div>
    )
}

export default Loading
