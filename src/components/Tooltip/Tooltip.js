import React from 'react'
import { withContentRect } from 'react-measure'

const calculateDivStyle = (ownHeight, tooltip, scrollTop) => {
    var divStyle = {}
    if (tooltip && tooltip.show) {
        divStyle = {
            left: tooltip.sidebarLeftWidth,
            top: tooltip.top + ((tooltip.parentHeight/2) - (ownHeight/2)) - scrollTop,
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
