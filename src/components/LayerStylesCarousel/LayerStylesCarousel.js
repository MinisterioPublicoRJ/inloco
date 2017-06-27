import React from 'react'
import LayerStyleItem from './LayerStyleItem';

const LayerStylesCarousel = ({ layer, onArrowLeftClick, onArrowRightClick, onStyleClick }) => {

    const STYLE_WIDTH = 66 //magic number

    let selectedLayerId

    let leftArrowClassName  = 'layer-styles-carousel--arrow fa fa-chevron-left'
    let rightArrowClassName = 'layer-styles-carousel--arrow fa fa-chevron-right'

    if (layer.styles.length < 6) {
        leftArrowClassName  += ' hidden'
        rightArrowClassName += ' hidden'
    } else {
        if (!layer.stylesPositionCounter) {
            leftArrowClassName += ' hidden'
        } else if (layer.stylesPositionCounter === layer.styles.length - 5) {
            rightArrowClassName += ' hidden'
        }
    }

    let carouselListStyle = {
        width: (layer.styles.length * STYLE_WIDTH) + 'px',
        marginLeft: -( (layer.stylesPositionCounter || 0) * STYLE_WIDTH) + 'px',
    }

    function arrowLeftClick() {
        return onArrowLeftClick(layer)
    }

    function arrowRightClick() {
        return onArrowRightClick(layer)
    }

    return (
        <div className="layer-styles-carousel">
            <a role="button" className={leftArrowClassName} onClick={arrowLeftClick}></a>
            <div className="layer-styles-carousel--list-container">
                <ul className="layer-styles-carousel--list" style={carouselListStyle}>
                    {layer.styles.map((style, indexStyle) => {
                        return (
                            <LayerStyleItem
                                layer={layer}
                                style={style}
                                key={indexStyle}
                                index={indexStyle}
                                onStyleClick={onStyleClick}
                            />
                        )
                    })}
                </ul>
            </div>
            <a role="button" className={rightArrowClassName} onClick={arrowRightClick}></a>
        </div>
    )
}

export default LayerStylesCarousel
