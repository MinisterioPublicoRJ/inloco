import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { showMenuLayer } from '../../actions/actions.js';

const mapDispatchToProps = (dispatch) => {
    return {
        onHeaderClick: () => {
            dispatch(showMenuLayer());
        }
    };
};

const HeaderContainer = connect(
    null,
    mapDispatchToProps
)(Header)

export default HeaderContainer;
