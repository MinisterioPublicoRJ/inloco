import React from 'react';
import SidebarLeft from './SidebarLeft';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {
        searchLayer: (text) => {
            dispatch({
                type: 'SEARCH_LAYER',
                text
            })
        },
        hideMenu: () => {
            dispatch({
                type: 'HIDE_MENU_LAYER'
            })
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
