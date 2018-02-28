import React from 'react'
import Place from './Place'

const GlobalFilter = ({
    globalFilterType,
    mapProperties,
    places,
    tutela,
    onContourChange,
    onGlobalFilterTypeChange,
    onKeyUpSearch,
    onOpacityChange,
    onPlaceClick,
}) => {

    let input

    // treat opacity tooltip value
    let opacity

    if (!mapProperties) {
        opacity = .5
    } else {
        opacity = mapProperties.opacity
    }
    if(isNaN(opacity)) {
        opacity = .5
    }
    opacity *= 100

    const handleGlobalFilterTypeChange = e => {
        onGlobalFilterTypeChange(e.target.value)
    }
    const handleKeyUpSearch = val => {
        onKeyUpSearch(val)
    }
    const handleOpacityChange = e => {
        onOpacityChange(e.target.value)
    }
    const handleTypeChange = e => {
        onContourChange(e.target.value)
    }
    const inputOnKeyUp = () => {
        handleKeyUpSearch(input.value)
    }

    return (
        <div className="global-filter">
            <form>
                <label>
                    <input
                        type="radio"
                        value="places"
                        checked={globalFilterType === 'places'}
                        onChange={handleGlobalFilterTypeChange}
                    /> Por área
                </label>
                <label>
                    <input
                        type="radio"
                        value="tutela"
                        checked={globalFilterType === 'tutela'}
                        onChange={handleGlobalFilterTypeChange}
                    /> Por órgão
                </label>
            </form>
            { globalFilterType === 'places' ?
            <div>
                <p>TEMP: Places</p>
                <form>
                    <fieldset className="global-filter-form">
                        <p className="global-filter-form--title">Busca detalhada</p>
                        <fieldset className="global-filter-form--inputsearch">
                            <input
                                id="searchField"
                                type="search"
                                placeholder="Insira o nome da área"
                                onKeyUp={inputOnKeyUp}
                            />

                            <label htmlFor="searchField"><i className="fa fa-search"></i></label>
                        </fieldset>
                        <fieldset className="global-filter-form--selectiontype">
                            <label>Tipo de seleção:</label>
                            <label htmlFor="selectionType1" className="input-checkopacity">
                                <input
                                    name="selectionType"
                                    type="radio"
                                    id="selectionType1"
                                    defaultChecked="checked"
                                    value="borda"
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

                        <fieldset className="global-filter-form--selectopacity">
                            <label>Opacidade da seleção:</label>
                            <label className="opacity-selector">
                                <input type="range" min="0" max="10" defaultValue="5" onChange={(e) => handleOpacityChange(e)}></input>
                                <span>{opacity}%</span>
                            </label>
                        </fieldset>
                    </fieldset>
                </form>
                <div className="global-filter-places">
                    <p className="global-filter-places--title">Áreas dos CRAAIs</p>
                    <div className="list-crais">
                        {places ? places.map(p => <Place onPlaceClick={onPlaceClick} key={p.id} place={p}/>) : null}
                    </div>
                </div>
            </div> : null }
            { globalFilterType === 'tutela' ?
            <div>
                <p>TEMP: Tutela</p>
                <form>
                    <fieldset className="global-filter-form">
                        <p className="global-filter-form--title">Busca detalhada</p>
                        <fieldset className="global-filter-form--inputsearch">
                            <input
                                id="searchField"
                                type="search"
                                placeholder="Insira o nome da área"
                                onKeyUp={inputOnKeyUp}
                            />

                            <label htmlFor="searchField"><i className="fa fa-search"></i></label>
                        </fieldset>
                        <fieldset className="global-filter-form--selectiontype">
                            <label>Tipo de seleção:</label>
                            <label htmlFor="selectionType1" className="input-checkopacity">
                                <input
                                    name="selectionType"
                                    type="radio"
                                    id="selectionType1"
                                    defaultChecked="checked"
                                    value="borda"
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

                        <fieldset className="global-filter-form--selectopacity">
                            <label>Opacidade da seleção:</label>
                            <label className="opacity-selector">
                                <input type="range" min="0" max="10" defaultValue="5" onChange={(e) => handleOpacityChange(e)}></input>
                                <span>{opacity}%</span>
                            </label>
                        </fieldset>
                    </fieldset>
                </form>
                <div className="global-filter-places">
                    <p className="global-filter-places--title">Áreas dos CRAAIs</p>
                    <div className="list-crais">
                        {tutela ? tutela.map(p => <Place onPlaceClick={onPlaceClick} key={p.id} place={p}/>) : null}
                    </div>
                </div>
            </div> : null }
        </div>
    )
}

export default GlobalFilter
