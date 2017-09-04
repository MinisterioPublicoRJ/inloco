import React from 'react'

const StreetView = ({ googleApiToken, streetViewCoordinates, onStreetViewHide }) => {

    let GOOGLE_STREET_VIEW_URL = `https://www.google.com/maps/embed/v1/streetview?key=${googleApiToken}&location=${streetViewCoordinates.lat},${streetViewCoordinates.lng}`

    return (
        <div className="streetview-modal">
            <div className="streetview-container">
                <button className="streetview-container--closebutton" onClick={onStreetViewHide}><i className="fa fa-close"></i></button>
                <iframe id="streetView" src={GOOGLE_STREET_VIEW_URL} frameBorder="0" allowFullScreen></iframe>
            </div>
        </div>
    )
}

export default StreetView
