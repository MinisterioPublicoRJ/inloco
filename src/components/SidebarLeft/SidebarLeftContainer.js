import React from 'react';
import SidebarLeft from './SidebarLeft';
import { connect } from 'react-redux';
import { searchLayer } from '../../actions/actions.js';
import { hideMenuLayer } from '../../actions/actions.js';

const mapDispatchToProps = (dispatch) => {
    return {
        onKeyUpSearch: (text) => {
            dispatch(searchLayer(text));
        },
        onClickMenuHeader: () => {
            dispatch(hideMenuLayer());
        }
    };
};

const mapStateToProps = (state) => {
    return {
        showMenu: state.showMenu
    }
}

const SidebarLeftContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarLeft)

export default SidebarLeftContainer;
