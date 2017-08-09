import React from 'react'

const Place = ({place}) => {
    console.log(place)

    return (
        <div key={place.id} className="place">
            {place.title}
        </div>
    )
}

export default Place
