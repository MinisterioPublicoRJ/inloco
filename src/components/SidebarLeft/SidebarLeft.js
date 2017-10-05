import React from 'react'
import MenuHeader from '../MenuHeader/MenuHeader.js'
import MenuContainer from '../Menu/MenuContainer.js'
import SearchLayer from '../SearchLayer/SearchLayer.js'
import { withContentRect } from 'react-measure'

const SidebarLeft = withContentRect(['bounds', 'client'])(({
    measureRef,
    measure,
    contentRect,
    onSearchClick,
    onKeyUpSearch,
    showMenu,
    onClickMenuHeader,
    onBtnCleanSearch,
    searchString,
}) => {
    var cssClass = 'sidebar-left allow-transition'
    if (!showMenu) {
        cssClass += ' hide-sidebar'
    }
    return (
            <div ref={measureRef} className={cssClass}>
                <MenuHeader onClickMenuHeader={onClickMenuHeader}/>
                <MenuContainer sidebarLeftWidth={contentRect.client.width} sidebarLeftHeight={contentRect.client.height}/>
                <SearchLayer onSearchClick={onSearchClick} onKeyUpSearch={onKeyUpSearch} onBtnCleanSearch={onBtnCleanSearch} searchString={searchString}/>
            </div>
    )
})

export default SidebarLeft
