import React from 'react'

const globalFilter = ({places}) => {


    return (
        <div className="class">
            <span> Busca detalhada </span>
            <span> Tipo de seleção </span>
            <form>
                <label htmlFor="selectionType1" className="asdasd">
                    Demarcada:
                    <input
                        name="selectionType"
                        type="radio"
                        id="selectionType1"
                        value="demarcada"/>
                </label>
                <label htmlFor="selectionType2" className="asdasd">
                    Isolada:
                    <input
                        name="selectionType"
                        type="radio"
                        id="selectionType2"
                        value="isolada"/>
                </label>
            </form>
            {places}
        </div>
    )
}

export default globalFilter
