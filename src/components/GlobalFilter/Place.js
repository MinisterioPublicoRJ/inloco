import React from 'react'

const Place = ({place, onPlaceClick}) => {
    const handleItemClick = (e) => {
        onPlaceClick({ text: e.target.textContent, id: e.target.dataset.id })
        e.stopPropagation();
    }
    if((place.tipo === "CRAAI" && place.show === undefined) || place.show === true){
        return (
            <div className="place" data-id={place.id} onClick={(e) => handleItemClick(e)}>
                {place.title}
                {place.nodes && place.nodes.map( p => <Place onPlaceClick={onPlaceClick} key={p.id} place={p}/>)}
            </div>
        )
    } else {
        return null
    }
}

export default Place
