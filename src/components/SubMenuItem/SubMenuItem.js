import React from 'react';

const SubMenuItem = ({item, camadas}) => {
    console.log("submenuitem", item, camadas)
    return (
        <li>
            { camadas[item].title }
        </li>
    );
}

export default SubMenuItem;
