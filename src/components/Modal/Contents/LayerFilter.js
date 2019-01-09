import React from 'react'
import DataTable from '../../DataTable/DataTable.js'

const LayerFilter = ({isFilterEmptyResult, isLoadingFilter, layers, modalLayerFilterName, onLayerFilterSearch}) => {
    const handleFilter = e => {
        e.preventDefault()
        onLayerFilterSearch(modalLayerFilterName, e.target.elements.parameterKey.value, e.target.elements.parameterValue.value.toLocaleLowerCase())
    }

    const filteredLayers = layers.filter(l => l.name === modalLayerFilterName)
    if (filteredLayers.length === 0) {
        return <p>Erro ao carregar parâmetros.</p>
    }
    const filteredLayer = filteredLayers[0]

    return (
        <div>
            <p>Selecione um parâmetro, digite um valor e clique em Filtrar:</p>
            <form onSubmit={handleFilter}>
                <select name="parameterKey">
                    {filteredLayer.params.map((param, idx) => <option key={idx}>{param}</option>)}
                </select>
                <input type="text" name="parameterValue"/>
                <button type="submit">Filtrar</button>
            </form>
            {isLoadingFilter ? <p>Aguarde, carregando dados...</p> : null}
            {isFilterEmptyResult ? <p>Não foram encontrados dados para o valor buscado.</p> : null}
            {filteredLayer.filteredData ?
                <DataTable layer={filteredLayer} isLayerFilter={true}/>
            : null}
        </div>
    )
}

export default LayerFilter
