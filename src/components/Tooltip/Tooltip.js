import React from 'react';

const Tooltip = ({tooltip}) => {
    var className = "";
    var text = "";
    var divStyle = {};
    if(tooltip && tooltip.show){
        className = "tooltip";
        text = tooltip.text;
        divStyle = {
            left: 300,
            /*
                it should be the same width as sidebar-left element
                need to create a constant to use here and on sidebar-left
                css
            */
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
