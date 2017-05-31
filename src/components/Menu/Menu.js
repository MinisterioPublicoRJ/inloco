import React from 'react'
import MenuItem from './MenuItem'

const Menu = ({menuItems, menuTitle, menuSubMenu, parentMenuTitle, layers, onLayerClick, onMenuItemClick, onMouseOver, sidebarLeftWidth, sidebarLeftHeight, onMouseOut, onUntoggleAllClick, selected, currentLevel}) => {

    // add a selected class to the menu if it is selected
    let menuClassName = "menu menu-container" + (selected ? ' selected' : '')

    // check if there are items hidden by search
    let itemsNotMatched = false
    if(menuItems){
        for (let menuItem of menuItems) {
            if (menuItem.title && menuItem.match === false) {
                itemsNotMatched = true
            }
        }
    }

    return (
        <ul className={menuClassName}>
            {
                (!menuTitle && currentLevel > 0 && !itemsNotMatched) ?
                    <li className="menu-item-all-layers" onClick={onUntoggleAllClick}>Todas as camadas</li>
                : ''
            }
            {
                menuSubMenu ? menuSubMenu.map(
                    (subMenu, idx) =>
                    <MenuItem
                        key={subMenu.idMenu}
                        item={subMenu}
                        layers={subMenu.layers}
                        onLayerClick={onLayerClick}
                        onMenuItemClick={onMenuItemClick}
                        onItemClick={onMenuItemClick}
                        onMouseOver={onMouseOver}
                        sidebarLeftWidth={sidebarLeftWidth}
                        sidebarLeftHeight={sidebarLeftHeight}
                        onMouseOut={onMouseOut}
                        parentMenuTitle={menuTitle}
                        currentLevel={currentLevel}
                        allMenuItems={menuItems}
                        isSubMenu={true}
                    />
                ) : ''
            }
            {
                menuItems ? menuItems.map(
                    (item) =>
                    <MenuItem
                        item={item}
                        layers={layers}
                        onLayerClick={onLayerClick}
                        onMenuItemClick={onMenuItemClick}
                        onItemClick={Number.isInteger(item) ? onLayerClick : onMenuItemClick}
                        onMouseOver={onMouseOver}
                        sidebarLeftWidth={sidebarLeftWidth}
                        sidebarLeftHeight={sidebarLeftHeight}
                        onMouseOut={onMouseOut}
                        parentMenuTitle={menuTitle}
                        currentLevel={currentLevel}
                        allMenuItems={menuItems}
                        key={Number.isInteger(item) ? item : item.idMenu}
                    />
                ) : ''
            }
        </ul>
    )
}

export default Menu
