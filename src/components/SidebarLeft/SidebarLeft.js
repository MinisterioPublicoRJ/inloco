import React from 'react'
import MenuHeader from '../MenuHeader/MenuHeader.js'
import MenuContainer from '../Menu/MenuContainer.js'
import SearchLayer from '../SearchLayer/SearchLayer.js'
import Measure from 'react-measure'

const SidebarLeft = ({
    onKeyUpSearch,
    showMenu,
    onClickMenuHeader,
    onBtnCleanSearch,
    searchString
}) => {
    var cssClass = 'sidebar-left allow-transition'

    if (!showMenu) {
        cssClass += ' hide-sidebar'
    }
    return (
        <Measure>
            {({width, height}) =>
                <div className={cssClass}>
                    <MenuHeader onClickMenuHeader={onClickMenuHeader}/>
                    <MenuContainer sidebarLeftWidth={width} sidebarLeftHeight={height}/>
                    <SearchLayer onKeyUpSearch={onKeyUpSearch} onBtnCleanSearch={onBtnCleanSearch} searchString={searchString}/>
                </div>
            }
        </Measure>
    )
}

export default SidebarLeft
