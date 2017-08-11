import React from 'react'

const Place = ({place}) => {

    return (
        <div className="place">
            {place.title}
            {place.nodes && place.showNodes? place.nodes.map( p => <Place key={p.id} place={p}/>) : null}
        </div>
    )
}

export default Place
