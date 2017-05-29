import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {
        showMenuLayer: () => {
            dispatch({
                type: 'SHOW_MENU_LAYER'
            })
        }
    };
};

const HeaderContainer = connect(
    null,
    mapDispatchToProps
)(Header)

export default HeaderContainer;
