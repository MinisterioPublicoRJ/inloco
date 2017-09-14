import React from 'react'
import { connect } from 'react-redux'
import GooglePlaces from '../GooglePlaces/GooglePlaces'
import { addGooglePlacesLatLong } from '../../actions/actions'

const mapStateToProps = (state, ownProps) => {
    return {
        mapProperties: state.mapProperties,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddGooglePlacesLatLong: (latLong) => {
            dispatch(addGooglePlacesLatLong(latLong))
        }
    }
}

const GooglePlacesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GooglePlaces)

export default GooglePlacesContainer
