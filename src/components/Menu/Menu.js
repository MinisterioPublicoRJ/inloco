import React from 'react';
import MenuItem from './MenuItem';

const Menu = ({menuItems, menuTitle, parentMenuTitle, layers, onLayerClick, onMenuItemClick, onUntoggleAllClick, selected, currentLevel}) => {
    let menuClassName = "menu" + (selected ? ' selected' : '');

    return (
        <ul className={menuClassName}>
            {
                (!menuTitle && currentLevel > 0) ?
                    <li className="menuBreadcrumb" onClick={onUntoggleAllClick}>Todas as camadas</li>
                : ''
            }
            {
                menuItems.map(
                    (item) =>
                    <MenuItem
                        item={item}
                        layers={layers}
                        onLayerClick={onLayerClick}
                        onMenuItemClick={onMenuItemClick}
                        onItemClick={Number.isInteger(item) ? onLayerClick : onMenuItemClick}
                        parentMenuTitle={menuTitle}
                        currentLevel={currentLevel}
                        key={Number.isInteger(item) ? item : item.idMenu}
                    />
                )
            }
        </ul>
    );
}

export default Menu;
