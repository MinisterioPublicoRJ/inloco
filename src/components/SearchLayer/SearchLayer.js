import React from 'react'

const SearchLayer = ({onKeyUpSearch, onBtnCleanSearch, searchString}) => {
    let input
    var searchIconClass = 'search-layer--icon fa fa-'
    var onClickEvent = null
    if (searchString !== undefined && searchString.length === 0) {
        searchIconClass += 'search'
    } else {
        searchIconClass += 'close'
        onClickEvent = () => {
            input.value = ''
            onBtnCleanSearch()
        }
    }
    return (
        <form action="#" className="search-layer">
            <label htmlFor="searchLayer" className="search-layer--title">
                Ou pesquise por aqui:
                <span className={searchIconClass} onClick={onClickEvent}></span>
                <input
                    type="text"
                    id="searchLayer"
                    ref={node => {input = node;}}
                    onKeyUp={() => {
                        onKeyUpSearch(input.value)
                    }}
                    className="search-layer--input"
                    placeholder="Ex.: Educação"/>
            </label>
        </form>
    )
}

export default SearchLayer
