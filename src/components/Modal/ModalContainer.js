import React from 'react'
import Modal from './Modal'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
    }
}

const ModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)

export default ModalContainer
