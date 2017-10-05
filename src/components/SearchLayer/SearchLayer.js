import React from 'react'

const SearchLayer = ({onSearchClick, onKeyUpSearch, onBtnCleanSearch, searchString}) => {
    let input
    var searchIconClass = 'search-layer--icon fa fa-'
    var onIconClick = null
    if (searchString !== undefined && searchString.length === 0) {
        searchIconClass += 'search'
    } else {
        searchIconClass += 'close'
        onIconClick = () => {
            input.value = ''
            onBtnCleanSearch()
        }
    }

    const preventSubmit = (e) => {
        e.preventDefault()
    }

    const inputField = node => {
        input = node
        if (node) {
            node.focus()
        }
    }

    const inputOnKeyUp = () => {
        onKeyUpSearch(input.value)
    }

    const inputOnClick = () => {
        onSearchClick()
    }

    return (
        <form action="#" className="search-layer" onSubmit={preventSubmit}>
            <label htmlFor="searchLayer" className="search-layer--title">
                Ou pesquise por aqui:
                <span className={searchIconClass} onClick={onIconClick}></span>
                <input
                    type="text"
                    id="searchLayer"
                    ref={inputField}
                    onClick={inputOnClick}
                    onKeyUp={inputOnKeyUp}
                    className="search-layer--input"
                    placeholder="Ex.: Escolas"/>
            </label>
        </form>
    )
}

export default SearchLayer
