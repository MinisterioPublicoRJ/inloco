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
        <div className="global-filter-container">
            <form>
                <fieldset className="global-filterform">
                    <p className="global-filter-container--title">Busca detalhada</p>
                    <fieldset className="global-filterform--inpusearch">
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
                    <fieldset className="global-filterform--selectiontype">
                        <label>Tipo de seleção</label>
                        <label htmlFor="selectionType1" className="asdasd">
                            <input
                                name="selectionType"
                                type="radio"
                                id="selectionType1"
                                value="borda"
                                defaultChecked="checked"
                                onClick={(e) => handleTypeChange(e)} />
                            Demarcada
                        </label>
                        <label htmlFor="selectionType2" className="asdasd">
                            <input
                                name="selectionType"
                                type="radio"
                                id="selectionType2"
                                value="opaco"
                                onClick={(e) => handleTypeChange(e)} />
                            Isolada
                        </label>
                    </fieldset>

                    <fieldset className="global-filterform--selectopacity">
                        <label> Opacidade da seleção
                            <input className="opacitySelection" type="range" min="0" max="10" defaultValue="5" onChange={(e) => handleOpacityChange(e)}></input>
                        </label>
                    </fieldset>
                </fieldset>
            </form>
            <p>Áreas do Rio de Janeiro</p>
            <div className="places">
                {places? places.map(p => <Place onPlaceClick={onPlaceClick} key={p.id} place={p}/>) : null}
            </div>
        </div>
    )
}

export default GlobalFilter
