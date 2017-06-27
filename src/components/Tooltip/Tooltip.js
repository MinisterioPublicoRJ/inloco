import React from 'react'
import Measure from 'react-measure'

const calculateDivStyle = (ownHeight, tooltip) => {
    var divStyle = {}

    if (tooltip && tooltip.show) {
        divStyle = {
            left: tooltip.sidebarLeftWidth,
            top: tooltip.top + (tooltip.parentHeight/2) - (ownHeight/2),
        }
    }
    return divStyle
}

const Tooltip = ({tooltip}) => {
    var className = ''
    var text = ''
    var title = ''
    if (tooltip && tooltip.show) {
        className = 'tooltip'
        text = tooltip.text === '' ? 'Não tem descrição' : tooltip.text
    }
    return (
        <Measure>
            {({height}) =>
                <div className={className} style={calculateDivStyle(height, tooltip)}>
                    {text}
                </div>
            }
        </Measure>
    )
}

export default Tooltip
