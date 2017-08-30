import React from 'react';

const StreetView = ({ streetViewCoordinates, onStreetViewHide }) => {

    console.log(streetViewCoordinates);

    let GOOGLE_STREET_VIEW_URL = `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBoZlEM3ASki3UzBfSHpQWW6dM0hHD0no0&location=${streetViewCoordinates.lat},${streetViewCoordinates.lng}`

    return (
        <div className="streetViewContainer">
            <div className="streetViewContainer-closeButton" onClick={onStreetViewHide}>X</div>
            <iframe id="streetView" src={GOOGLE_STREET_VIEW_URL} frameBorder="0" allowFullScreen></iframe>
        </div>
    )
}

export default StreetView
