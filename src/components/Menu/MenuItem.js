import React from 'react'
import Menu from './Menu'
import { withContentRect } from 'react-measure'

const MenuItem = withContentRect('bounds')(({measureRef, measure, contentRect, item, layers, onItemClick, onMouseOver, sidebarLeftWidth, sidebarLeftHeight, onMouseOut, onMenuItemClick, onLayerClick, parentMenuTitle, currentLevel, allMenuItems}) => {
    // class name if menu item with children or single layer, with no children
    let menuItemClassName
    let visibleClass = ''
    let itemTitle = ''
    let otherIsSelected = false
    let otherIsNotMatched = false

    // if item is defined. can't be `if (item)` because item can be the numeric id `0`.
    if (item !== undefined) {
        menuItemClassName = item.title ? 'menu-item-with-children' : 'menu-item-layer'
        menuItemClassName += item.selected ? ' selected' : ''

        // check if one menu is selected, and no other items are matched, hide others
        if (allMenuItems) {
            for (let otherMenuItem of allMenuItems) {
                if (otherMenuItem.title && otherMenuItem.title !== item.title) {
                    if (otherMenuItem.selected) {

                        // we must not hide submenu children
                        let itemSubMenuFound = false

                        otherMenuItem.submenus.forEach( (subMenu) => {
                            if (item.idMenu === subMenu) {
                                itemSubMenuFound = true
                            }
                        })

                        if (!itemSubMenuFound) {
                            otherIsSelected = true
                        }

                    }
                    if (!otherMenuItem.match) {
                        otherIsNotMatched = true
                    }
                }
            }
            if (otherIsSelected && !otherIsNotMatched) {
                // we can only hide other items if not on search
                visibleClass = 'hidden'
            }
        }

        // if menu with children
        if (item.title) {
            itemTitle = item.title
            // if it doesn't match search, hide it
            if (!item.match) {
                visibleClass = 'hidden'
            }

            // if we are on top menu level, shouldn't show submenus
            if (currentLevel === 0 && item.isSubMenu) {
                visibleClass = 'hidden'
            }

            // if this menu has submenu opened, it should be visible
            item.submenus.forEach((subMenu) => {
                // check if this submenu is selected
                allMenuItems.forEach((oneMenuItem) => {
                    if (oneMenuItem.idMenu === subMenu) {
                        if (oneMenuItem.selected) {
                            // make it visible
                            visibleClass = ''
                        }
                    }
                })
            })

            // if this menu is selected
            if (item.selected) {
                // if this menu is a submenu it is active
                if (currentLevel === 1) {
                    menuItemClassName += ' active'
                }

                // if this menu is sub-submenu and it does not have children, it is active
                if (currentLevel > 1 && item.submenus.length === 0) {
                    menuItemClassName += ' active'
                }
            }

        } else {
            // if it's a layer, check if it's match'ed.
            for (var i =0; i < layers.length; i++) {
                var layer = layers[i]
                if (layer.key === item) {
                    itemTitle = layer.title
                    if (!layer.match) {
                        visibleClass = 'hidden'
                    }
                }
            }

            // check if layer is selected
            if (!item.title){
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i]
                    if (layer.key === item && layer.selected) {
                        menuItemClassName += ' layer-selected'
                    }
                }
            }
        }
        visibleClass += " menu-item-container"
    }

    function hasSubmenu() {
        if (!item.submenus) {
            return false
        }
        return item.submenus.length > 0 ? true : false
    }

    function handleItemClick(){
        // check if is a layer or a menu click
        if (item.id) {
            // is a menu
            // check if is selected
            if (!item.selected) {
                // if is not selected, do action
                return onItemClick(item)
            } else {
                // if is selected, check if my children is open
                if (hasSubmenu() && currentLevel > 1) {
                    return onItemClick(item)
                }
            }
        } else {
            // is a layer
            return onItemClick(layers[item])
        }
        return null
    }

    return (
                <div ref={measureRef} className={visibleClass}>
                    <li
                        onMouseOut={() => onMouseOut(item.id ? undefined : layers[item])}
                        onMouseOver={(event) => onMouseOver(item.id ? undefined : layers[item], sidebarLeftWidth, contentRect.bounds.height, contentRect.bounds.top)}
                        onClick={() => handleItemClick()}
                        className={menuItemClassName}
                    >
                        { itemTitle }
                    </li>
                    {
                        (item && item.layers) ?
                        <Menu
                            menuItems={item.layers}
                            menuTitle={item.title}
                            submenus={item.submenus}
                            allMenuItems={allMenuItems}
                            parentMenuTitle={parentMenuTitle}
                            key={item.idMenu}
                            idMenu={item.idMenu}
                            selected={item.selected}
                            layers={layers}
                            onMenuItemClick={onMenuItemClick}
                            onLayerClick={onLayerClick}
                            onMouseOver={onMouseOver}
                            sidebarLeftWidth={sidebarLeftWidth}
                            sidebarLeftHeight={sidebarLeftHeight}
                            onMouseOut={onMouseOut}
                            currentLevel={currentLevel}
                        />
                        : ''
                    }
                </div>
    )
})
export default MenuItem
