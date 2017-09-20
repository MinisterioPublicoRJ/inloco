import React from 'react'
import Help from './Help'
import { connect } from 'react-redux'
import { hideHelp } from '../../actions/actions.js'

const mapStateToProps = (state, ownProps) => {
    return {
        showHelp: state.showHelp,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIntrojsExit: () => {
            dispatch(hideHelp())
        }
    }
}

const HelpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Help)

export default HelpContainer
