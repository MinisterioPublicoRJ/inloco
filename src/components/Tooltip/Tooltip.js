import React from 'react';

const Tooltip = ({tooltip}) => {
    var className = "";
    var text = "";
    if(tooltip && tooltip.show){
        className = "tooltip";
        text = tooltip.text;
    }
    return (
        <div>
            {tooltip ?
                <div className={className}>
                    { text }
                </div>
            : ''
            }
        </div>
    );
}

export default Tooltip;
