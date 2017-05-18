import React from 'react';

const MenuBreadcrumb = ({parentName}) => {
    return (
        <li className="menuBreadcrumb">{parentName ? parentName : 'Todas as camadas'}</li>
    );
}

export default MenuBreadcrumb;
