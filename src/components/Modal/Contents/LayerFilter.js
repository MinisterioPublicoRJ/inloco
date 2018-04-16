import React from 'react'

const LayerFilter = ({layerFilter}) => {
    const handleFilter = e => {
        e.preventDefault()
        console.log('handleFilter', e.target.elements.parameterKey.value, e.target.elements.parameterValue.value)
    }

    return (
        <div>
            <p>Selecione um parâmetro, digite um valor e clique em Filtrar:</p>
            <form onSubmit={handleFilter}>
                <select name="parameterKey">
                    {layerFilter.params.map((param, idx) => <option key={idx}>{param}</option>)}
                </select>
                <input type="text" name="parameterValue"/>
                <button type="submit">Filtrar</button>
            </form>
        </div>
    )
}

export default LayerFilter
