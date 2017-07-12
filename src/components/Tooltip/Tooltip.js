import React from 'react'
import { withContentRect } from 'react-measure'

const calculateDivStyle = (ownHeight, tooltip, scrollTop) => {
    var divStyle = {}
    if (tooltip && tooltip.show) {


        const headerHeight = 131 // TODO dynamic value
        const menuItemHeight = 33 // TODO variable

        let mouseYMinusHeader = tooltip.mouseY - headerHeight
        let index = mouseYMinusHeader / menuItemHeight
        let roundedMouseYMinusHeader = Math.floor(index) * menuItemHeight
        let roundedMouseYTop = roundedMouseYMinusHeader + headerHeight
        let roundedMouseY = roundedMouseYTop + (menuItemHeight / 2)
        let correctTooltipPosition = roundedMouseY - (ownHeight/2)

        divStyle = {
            left: tooltip.sidebarLeftWidth,
            top: correctTooltipPosition,
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
