import React from 'react';

const Tooltip = ({tooltip}) => {
    var className = "";
    var text = "";
    var divStyle = {};
    if(tooltip && tooltip.show){
        className = "tooltip";
        text = tooltip.text;
        divStyle = {
            left: tooltip.x,
            top: tooltip.y
        }
    }
    return (
        <div>
            {tooltip ?
                <div style = {divStyle} className={className}>
                    { text }
                </div>
            : ''
            }
        </div>
    );
}

export default Tooltip;
