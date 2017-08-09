import React from 'react'

const Place = ({place}) => {
    console.log(place)

    return (
        <div className="place">
            {place.title}
            {place.nodes? place.nodes.map( p => <Place key={p.id} place={p}/>) : null}
        </div>
    )
}

export default Place
