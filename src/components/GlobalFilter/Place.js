import React from 'react'

const Place = ({place, onPlaceClick}) => {
    const handleItemClick = (e) => {
        onPlaceClick({ text: e.target.textContent, id: e.target.dataset.id })
        e.stopPropagation();
    }

    let className = 'place'
    let hasOpenChild = false

    if (place.nodes && place.nodes.length > 0) {
        // test if at least one element has show property true
        for (let i=0, l=place.nodes.length; i<l; i++) {
            if (place.nodes[i].show) {
                hasOpenChild = true
            }
        }
    }

    if (place.tipo === 'ESTADO') {
        hasOpenChild = true
    }

    if (hasOpenChild) {
        className += ' has-children'
    }

    if((place.tipo === "CRAAI" && place.show === undefined) || place.show === true){
        return (
            <div className={className} data-id={place.id} onClick={(e) => handleItemClick(e)}>
                {place.title}
                {place.nodes && place.nodes.map( p => <Place onPlaceClick={onPlaceClick} key={p.id} place={p}/>)}
            </div>
        )
    } else {
        return null
    }
}

export default Place
