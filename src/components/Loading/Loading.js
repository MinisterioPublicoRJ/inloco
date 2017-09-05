import React from 'react'

const Loading = ({ layers }) => {

    let loadingClass = 'module-loading'

    if (layers && layers.length > 0) {
        loadingClass += ' hidden'
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
