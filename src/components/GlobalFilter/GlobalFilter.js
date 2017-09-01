import React from 'react'
import Place from './Place'

const GlobalFilter = ({
    places,
    onPlaceClick,
    onOpacityChange,
    onContourChange,
    onKeyUpSearch
}) => {

    let input

    const handleOpacityChange = (e) => {
        onOpacityChange(e.target.value)
    }
    const handleTypeChange = (e) => {
        onContourChange(e.target.value)
    }
    const handleKeyUpSearch = (val) => {
        onKeyUpSearch(val)
    }

    return (
        <div className="global-filter">
            <form>
                <fieldset className="global-filter-form">
                    <p className="global-filter-form--title">Busca detalhada</p>
                    <fieldset className="global-filter-form--inpusearch">
                        <input
                            id="searchField"
                            type="search"
                            placeholder="Insira o nome da área"
                            ref={node => {input = node;}}
                            onKeyUp={() => {
                                handleKeyUpSearch(input.value)
                            }}
                        />

                        <label htmlFor="searchField"><i className="fa fa-search"></i></label>
                    </fieldset>
                    <fieldset className="global-filter-form--selectiontype">
                        <label>Tipo de seleção:</label>
                        <label htmlFor="selectionType1" className="input-checkopacity" for="">
                            <input
                                name="selectionType"
                                type="radio"
                                id="selectionType1"
                                value="borda"
                                defaultChecked="checked"
                                onClick={(e) => handleTypeChange(e)} />
                            <span>Demarcada</span>
                        </label>
                        <label htmlFor="selectionType2" className="input-checkopacity">
                            <input
                                name="selectionType"
                                type="radio"
                                id="selectionType2"
                                value="opaco"
                                onClick={(e) => handleTypeChange(e)} />
                            <span>Isolada</span>
                        </label>
                    </fieldset>

                    <fieldset className="global-filterform--selectopacity">
                        <label> Opacidade da seleção
                            <input className="opacitySelection" type="range" min="0" max="10" defaultValue="5" onChange={(e) => handleOpacityChange(e)}></input>
                        </label>
                    </fieldset>
                </fieldset>
            </form>
            <div className="global-filter-places">
                <p className="global-filter-places--title">Áreas dos CRAAIs</p>
                <div className="list-crais">
                    {places? places.map(p => <Place onPlaceClick={onPlaceClick} key={p.id} place={p}/>) : null}
                </div>
            </div>
        </div>
    )
}

export default GlobalFilter
