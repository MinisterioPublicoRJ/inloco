import React from 'react'
import { withContentRect } from 'react-measure'

const calculateDivStyle = (ownHeight, tooltip, scrollTop) => {
    var divStyle = {}
    if (tooltip && tooltip.show) {


        const headerHeight = 131 // TODO dynamic value
        const menuItemHeight = 33 // TODO variable

        // Trying to center tooltip
        // let mouseYMinusHeader = tooltip.mouseY - headerHeight
        // console.log("mouseYMinusHeader", mouseYMinusHeader)
        // let roundedMouseYMinusHeader = Math.floor(mouseYMinusHeader / menuItemHeight) * menuItemHeight
        // console.log("roundedMouseYMinusHeader", roundedMouseYMinusHeader)
        // let roundedMouseYTop = roundedMouseYMinusHeader + headerHeight
        // console.log("roundedMouseYTop", roundedMouseYTop)
        // let roundedMouseY = roundedMouseYTop + (menuItemHeight / 2)
        // console.log("roundedMouseY", roundedMouseY)

        let mouseYMinusHeader = tooltip.mouseY - headerHeight
        console.log("mouseYMinusHeader", mouseYMinusHeader)
        let index = mouseYMinusHeader / menuItemHeight
        console.log("index", index)
        let roundedMouseYMinusHeader = Math.floor(index) * menuItemHeight
        console.log("roundedMouseYMinusHeader", roundedMouseYMinusHeader)
        let roundedMouseYTop = roundedMouseYMinusHeader + headerHeight
        console.log("roundedMouseYTop", roundedMouseYTop)
        let roundedMouseY = roundedMouseYTop + (menuItemHeight / 2)
        console.log("roundedMouseY", roundedMouseY)

        //let roundedMouseY =


        //( Math.round( (tooltip.mouseY - headerHeight) / menuItemHeight ) * menuItemHeight ) + headerHeight + menuItemHeight / 2

        let correctTooltipPosition = roundedMouseY - (ownHeight/2)

        divStyle = {
            left: tooltip.sidebarLeftWidth,
            top: correctTooltipPosition,
            // top: tooltip.top + ((tooltip.parentHeight/2) - (ownHeight/2)) - scrollTop,
        }
    }
    return divStyle
}

const Tooltip = withContentRect('bounds')(({measureRef, measure, contentRect, tooltip, scrollTop}) => {
    var className = ''
    var text = ''
    var title = ''
    if (tooltip && tooltip.show) {
        className = 'tooltip'
        text = tooltip.text === '' ? 'Não tem descrição' : tooltip.text
    }
    return (
        <div  ref={measureRef} className={className} style={calculateDivStyle(contentRect.bounds.height, tooltip, scrollTop)}>
            {text}
        </div>
    )
})

export default Tooltip
