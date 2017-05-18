import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import MenuBreadcrumb from './MenuBreadcrumb';

const Menu = ({menuItems, menuTitle, parentMenuTitle, layers, onLayerClick, onMenuItemClick, selected}) => {
    let menuClassName = "menu" + (selected ? ' selected' : '');

    return (
        <ul className={menuClassName}>
            {
                selected ? <MenuBreadcrumb parentName={parentMenuTitle}/> : ''
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
                        key={Number.isInteger(item) ? item : item.idMenu}
                    />
                )
            }
        </ul>
    );
}

export default Menu;
