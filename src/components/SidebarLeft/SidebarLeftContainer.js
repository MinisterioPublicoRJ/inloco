import React from 'react';
import SidebarLeft from './SidebarLeft';
import { connect } from 'react-redux';
import { searchLayer, cleanSearch, hideMenuLayer, untoggleAll } from '../../actions/actions.js';

const mapDispatchToProps = (dispatch) => {
    return {
        onKeyUpSearch: (text) => {
            dispatch(untoggleAll());
            dispatch(searchLayer(text));
        },
        onBtnCleanSearch: () => {
            dispatch(cleanSearch());
            dispatch(searchLayer(""));
            dispatch(untoggleAll());
        },
        onClickMenuHeader: () => {
            dispatch(hideMenuLayer());
        }
    };
};

const mapStateToProps = (state) => {
    return {
        showMenu: state.showMenu,
        searchString: state.searchString
    }
}

const SidebarLeftContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarLeft)

export default SidebarLeftContainer;
