import React from 'react';
import Menu from './Menu';
import Tooltip from '../Tooltip/Tooltip';

const MenuItem = ({item, layers, onItemClick, onMouseOver, onMouseOut, onMenuItemClick, onLayerClick, parentMenuTitle, currentLevel}) => {
    let menuItemClassName = item.selected ? 'selected' : ''
    return (
        <div>
            <li
                onMouseOut={() => onMouseOut(item.id ? undefined : layers[item])}
                onMouseOver={() => onMouseOver(item.id ? undefined : layers[item])}
                onClick={() => onItemClick(item.id ? item : layers[item])}
                className={menuItemClassName}
            >
                { item.title ? item.title : layers[item].title }
                { !item.title && layers[item].showDescription ?  <Tooltip text={ layers[item].description } /> : "" }
            </li>
            {
                item.layers ?
                <Menu
                    menuItems={item.layers}
                    menuTitle={item.title}
                    parentMenuTitle={parentMenuTitle}
                    key={item.idMenu}
                    selected={item.selected}
                    layers={layers}
                    onMenuItemClick={onMenuItemClick}
                    onLayerClick={onLayerClick}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    currentLevel={currentLevel}
                />
                : ''
            }
        </div>
    );
}

export default MenuItem;
