import React from 'react';

const StreetView = ({ streetViewCoordinates }) => {

    console.log(streetViewCoordinates);

    let GOOGLE_STREET_VIEW_URL = `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBoZlEM3ASki3UzBfSHpQWW6dM0hHD0no0&location=${streetViewCoordinates.lat},${streetViewCoordinates.lng}`

    return (
        <div className="streetViewContainer">
            <iframe id="streetView" src={GOOGLE_STREET_VIEW_URL} frameBorder="0" allowFullScreen></iframe>
        </div>
    )
}

export default StreetView
