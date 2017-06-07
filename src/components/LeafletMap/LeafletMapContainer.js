import React from 'react'
import LeafletMap from './LeafletMap'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        mapProperties: state.mapProperties,
        showMenu: state.showMenu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
};

const LeafletMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeafletMap)

export default LeafletMapContainer
