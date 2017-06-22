import React from 'react';
import SidebarRight from './SidebarRight';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {};
};

const mapStateToProps = (state) => {
    return {};
}

const SidebarRightContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarRight)

export default SidebarRightContainer;
