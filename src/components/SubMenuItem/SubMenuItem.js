import React from 'react';

const SubMenuItem = ({item, layers}) => {
    return (
        <li>
            { layers[item].title }
        </li>
    );
}

export default SubMenuItem;
