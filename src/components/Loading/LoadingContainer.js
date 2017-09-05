import React from 'react'
import { connect } from 'react-redux'
import Loading from './Loading'

const mapStateToProps = (state, ownProps) => {
    return {
        layers: state.layers,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const LoadingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading)

export default LoadingContainer
