import React from 'react';
import Measure from 'react-measure';

const calculateDivStyle = (ownHeight, tooltip) => {
    var divStyle = {};
    var tooltipPositionDiff = 0;

    if(tooltip && tooltip.show){
        tooltipPositionDiff = (ownHeight + tooltip.y) - tooltip.sidebarLeftHeight;
        if (tooltipPositionDiff > 0){
            divStyle = {
                left: tooltip.sidebarLeftWidth,
                top: tooltip.y - tooltipPositionDiff
            }
        } else {
            divStyle = {
                left: tooltip.sidebarLeftWidth,
                top: tooltip.y
            }
        }
    }
    return divStyle;
}

const Tooltip = ({tooltip}) => {
    var className = "";
    var text = "";
    if(tooltip && tooltip.show){
        className = "tooltip";
        text = tooltip.text;
    }
    return (
        <Measure>
            {({height}) =>
                <div className={className} style = {calculateDivStyle(height, tooltip)}>
                    {tooltip ?
                        text
                        : ''
                    }
                </div>
            }
        </Measure>
    );
}

export default Tooltip;
