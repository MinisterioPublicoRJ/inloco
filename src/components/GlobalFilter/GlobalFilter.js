import React from 'react'

const globalFilter = ({places}) => {


    return (
        <div className="class">
            <span> Busca detalhada </span>
            <span> Tipo de seleção </span>
            <form>
                <label className="asdasd">
                    Demarcada:
                    <span className="asjkdh"></span>
                    <input
                        type="radio"
                        id="demarcada"
                        value="demarcada"/>
                </label>
                <label className="asdasd">
                    Isolada:
                    <span className="asjkdh"></span>
                    <input
                        type="radio"
                        id="isolada"
                        value="isolada"/>
                </label>
            </form>
            {places}
        </div>
    )
}

export default globalFilter
