import React from 'react'

const globalFilter = ({places}) => {


    return (
        <div className="global-filter-container">
            <span> Busca detalhada </span>
            <span> Tipo de seleção </span>
            <form>
                <label htmlFor="selectionType1" className="asdasd">
                    <input
                        name="selectionType"
                        type="radio"
                        id="selectionType1"
                        value="demarcada"/>
                    Demarcada
                </label>
                <label htmlFor="selectionType2" className="asdasd">
                    <input
                        name="selectionType"
                        type="radio"
                        id="selectionType2"
                        value="isolada"/>
                    Isolada
                </label>
            </form>
            {places}
        </div>
    )
}

export default globalFilter
