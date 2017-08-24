import React from 'react'

const Place = ({place, onPlaceClick}) => {
    const handleItemClick = (e) => {
        onPlaceClick({ text: e.target.textContent, id: e.target.dataset.id })
        e.stopPropagation();
    }
    return (
        <div className="place" data-id={place.id} onClick={(e) => handleItemClick(e)}>
            {place.title}
            {place.nodes && place.showNodes? place.nodes.map( p => <Place onPlaceClick={onPlaceClick} key={p.id} place={p}/>) : null}
        </div>
    )
}

export default Place
