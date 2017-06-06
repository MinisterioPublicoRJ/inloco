import React from 'react';
import SidebarRight from './SidebarRight';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return null;
};

const mapStateToProps = (state) => {
    return null;
}

const SidebarRightContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarRight)

export default SidebarRightContainer;
