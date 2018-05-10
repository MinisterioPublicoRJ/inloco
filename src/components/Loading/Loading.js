import React from 'react'

const Loading = ({ layers, showLoader, downloadLoader }) => {

    let loadingClass = 'module-loading'
    if (!showLoader && showLoader !== undefined) {
        loadingClass += ' hidden'
    }

    if (downloadLoader && downloadLoader === true) {
        loadingClass = 'module-loading'
    }

    return (
        <div className={loadingClass}>
            <div className="spinner">
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i><br />
                Carregando...</div>
        </div>
    )
}

export default Loading
