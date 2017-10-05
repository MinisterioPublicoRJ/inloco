import React from 'react'

const Place = ({place, onPlaceClick}) => {
    const handleItemClick = (e) => {
        onPlaceClick({ text: e.target.textContent, id: e.target.dataset.id })
        e.stopPropagation();
    }

    let className = 'place'
    let hasOpenChild = false
    let hasChild = false
    let isBeingSearched = false

    if (place.nodes && place.nodes.length > 0) {
        hasChild = true
        // test if at least one element has show property true
        for (let i=0, l=place.nodes.length; i<l; i++) {
            if (place.nodes[i].show) {
                hasOpenChild = true
            }
        }
    }

    if (place.tipo === 'ESTADO') {
        hasChild = true
        hasOpenChild = true
        if (place.search) {
            isBeingSearched = true
        }
    }

    if (hasChild) {
        className += ' has-children'

        if (!hasOpenChild) {
            className += ' has-no-open-children'
        }
    }

    if (hasOpenChild) {
        className += ' has-open-children'
    }

    if (isBeingSearched) {
        className += ' hide-empty'
    }

    if ((place.tipo === "CRAAI" && place.show === undefined) || place.show === true) {
        return (
            <div className={className} onClick={(e) => handleItemClick(e)}>
                <span data-id={place.id}>{place.title}</span>
                {place.nodes && place.nodes.map( p =>
                    <Place onPlaceClick={onPlaceClick} key={p.id} place={p}/>
                )}
            </div>
        )
    } else {
        return null
    }
}

export default Place
