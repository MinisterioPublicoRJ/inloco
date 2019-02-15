import React from 'react'
import Place from './Place'


const GlobalFilter = ({
    globalFilterType,
    mapProperties,
    places,
    tutela,
    onClearPlaceTutelaLayer,
    onContourChange,
    onGlobalFilterTypeChange,
    onKeyUpSearchPlaces,
    onKeyUpSearchTutela,
    onOpacityChange,
    onPlaceClick,
    onTutelaClick,
}) => {

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

    const handleClearPlaceTutelaLayer = e => {
        e.preventDefault()
        onClearPlaceTutelaLayer()
    }

    const handleGlobalFilterTypeChange = e => {
        onGlobalFilterTypeChange(e.target.value)
    }
    const handleKeyUpSearchPlaces = val => {
        onKeyUpSearchPlaces(val)
    }
    const handleKeyUpSearchTutela = val => {
        onKeyUpSearchTutela(val)
    }
    const handleOpacityChange = e => {
        onOpacityChange(e.target.value)
    }
    const handleTypeChange = e => {
        onContourChange(e.target.value)
    }
    const inputOnKeyUpPlaces = e => {
        handleKeyUpSearchPlaces(e.target.value)
    }
    const inputOnKeyUpTutela = e => {
        handleKeyUpSearchTutela(e.target.value)
    }

    return (
        <div>
            <form>
                <fieldset className="global-filter-wraptab">
                    <label className="global-filter-tab">
                        <input
                            id="places"
                            type="radio"
                            value="places"
                            checked={globalFilterType === 'places'}
                            onChange={handleGlobalFilterTypeChange}
                        />
                        <span htmlFor="places">Por área</span>
                    </label>

                    <label className="global-filter-tab">
                        <input
                            id="tutela"
                            type="radio"
                            value="tutela"
                            checked={globalFilterType === 'tutela'}
                            onChange={handleGlobalFilterTypeChange}
                        />
                        <span htmlFor="tutela">Por órgão</span>
                    </label>
                </fieldset>
            </form>
            <div className="global-filter">
                { globalFilterType === 'places' ?
                <div>
                    <form>
                        <fieldset className="global-filter-form">
                            <p className="global-filter-form--title">
                                Busca detalhada
                                <button className="global-filter-button-clean" onClick={handleClearPlaceTutelaLayer}>limpar busca</button>
                            </p>
                            <fieldset className="global-filter-form--inputsearch">
                                <input
                                    id="searchField"
                                    type="search"
                                    placeholder="Insira o nome da área"
                                    onKeyUp={inputOnKeyUpPlaces}
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
                                        value="borda"
                                        onClick={e => handleTypeChange(e)} />
                                    <span>Demarcada</span>
                                </label>
                                <label htmlFor="selectionType2" className="input-checkopacity">
                                    <input
                                        name="selectionType"
                                        type="radio"
                                        id="selectionType2"
                                        value="opaco"
                                        defaultChecked="checked"
                                        onClick={e => handleTypeChange(e)} />
                                    <span>Isolada</span>
                                </label>
                            </fieldset>

                            <fieldset className="global-filter-form--selectopacity">
                                <label>Opacidade da seleção:</label>
                                <label className="opacity-selector">
                                    <input type="range" min="0" max="10" defaultValue="5" onChange={e => handleOpacityChange(e)}></input>
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
                    <form>
                        <fieldset className="global-filter-form">
                            <p className="global-filter-form--title">Busca detalhada</p>
                            <fieldset className="global-filter-form--inputsearch">
                                <input
                                    id="searchField"
                                    type="search"
                                    placeholder="Insira o nome da área"
                                    onKeyUp={inputOnKeyUpTutela}
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
                                        value="borda"
                                        onClick={e => handleTypeChange(e)} />
                                    <span>Demarcada</span>
                                </label>
                                <label htmlFor="selectionType2" className="input-checkopacity">
                                    <input
                                        name="selectionType"
                                        type="radio"
                                        id="selectionType2"
                                        value="opaco"
                                        defaultChecked="checked"
                                        onClick={e => handleTypeChange(e)} />
                                    <span>Isolada</span>
                                </label>
                            </fieldset>

                            <fieldset className="global-filter-form--selectopacity">
                                <label>Opacidade da seleção:</label>
                                <label className="opacity-selector">
                                    <input type="range" min="0" max="10" defaultValue="5" onChange={e => handleOpacityChange(e)}></input>
                                    <span>{opacity}%</span>
                                </label>
                            </fieldset>
                        </fieldset>
                    </form>
                    <div className="global-filter-places">
                        <p className="global-filter-places--title">Áreas dos Órgãos</p>
                        <div className="list-crais">
                            {tutela ? tutela.map(p => <Place onPlaceClick={onTutelaClick} key={p.id} place={p}/>) : null}
                        </div>
                    </div>
                </div> : null }
            </div>
        </div>
    )
}

export default GlobalFilter
