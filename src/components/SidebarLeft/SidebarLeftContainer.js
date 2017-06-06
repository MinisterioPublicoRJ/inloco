import React from 'react';
import SidebarLeft from './SidebarLeft';
import { connect } from 'react-redux';
import { searchLayer } from '../../actions/actions.js';
import { cleanSearch } from '../../actions/actions.js';
import { hideMenuLayer } from '../../actions/actions.js';

const mapDispatchToProps = (dispatch) => {
    return {
        onKeyUpSearch: (text) => {
            dispatch(searchLayer(text));
        },
        onBtnCleanSearch: () => {
            dispatch(cleanSearch());
            dispatch(searchLayer(""));
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
