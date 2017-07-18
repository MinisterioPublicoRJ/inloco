import React from 'react'
import Modal from './Modal'
import { connect } from 'react-redux'
import { closeModal } from '../../actions/actions.js'

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseModal: () => {
            dispatch(closeModal())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
        layers: state.layers,
    }
}

const ModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)

export default ModalContainer
