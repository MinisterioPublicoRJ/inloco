import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'

const handleInputChange = (e) => {
    console.log(e)
}

const isChecked = (step, layer) => {

    // find the style that matches the step
    let selectedStyle = layer.styles.filter(style => style.name === 'plataforma:' + step[1])

    // if there is a style with this step
    if (selectedStyle[0]) {
        // if it's id matches the selected style id, it should be checked
        if (selectedStyle[0].id === layer.selectedLayerStyleId) {
            return true
        }
    }

    return false
}

const LayerStylesTimeslider = ({layer, onChange}) => {

    if (!layer.timesliders) {
        return null
    }

    console.log('timeslider', layer)

    return (<div className="timesliders">
        {layer.timesliders.map( (timeslider, indexTimeslider) =>
            <RadioGroup className="timeslider" onChange={handleInputChange} key={indexTimeslider}>
            {timeslider.steps.map( (step, indexStep) =>
                <span key={indexStep}>
                    <Radio value={step[1]} checked={isChecked(step, layer)}/>{step[0]}
                </span>
            )}
            </RadioGroup>
        )}
    </div>)
}

export default LayerStylesTimeslider
