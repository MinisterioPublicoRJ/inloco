import React from 'react'
import MenuItem from './MenuItem'

const Menu = ({menuItems, menuTitle, parentMenuTitle, layers, onLayerClick, onMenuItemClick, onUntoggleAllClick, selected, currentLevel}) => {

    // add a selected class to the menu if it is selected
    let menuClassName = "menu" + (selected ? ' selected' : '')

    // check if there are items hidden by search
    let itemsNotMatched = false
    for (let menuItem of menuItems) {
        if (menuItem.title && menuItem.match === false) {
            itemsNotMatched = true
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
                        allMenuItems={menuItems}
                        key={Number.isInteger(item) ? item : item.idMenu}
                    />
                )
            }
        </ul>
    )
}

export default Menu
