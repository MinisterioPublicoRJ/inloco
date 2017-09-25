import React from 'react'
import LayerStyleItem from './LayerStyleItem'

const LayerStylesCarousel = ({ layer, onArrowLeftClick, onArrowRightClick, onStyleClick, onStyleMouseOver, onStyleMouseOut }) => {

    const STYLE_WIDTH = 66

    let selectedLayerId

    let leftArrowClassName  = 'layer-styles-carousel--arrow fa fa-chevron-left'
    let rightArrowClassName = 'layer-styles-carousel--arrow fa fa-chevron-right'

    let layerStylesLength = 0
    let layerStylesPositionCounter = 0

    if (layer) {
        if (layer.styles && layer.styles.length < 6) {
            leftArrowClassName  += ' remove'
            rightArrowClassName += ' remove'
        } else {
            if (!layer.stylesPositionCounter) {
                leftArrowClassName += ' hidden'
            } else if (layer.stylesPositionCounter === layer.styles.length - 5) {
                rightArrowClassName += ' hidden'
            }
        }

        if (layer.styles) {
            layerStylesLength = layer.styles.length * STYLE_WIDTH
        }
        if (layer.stylesPositionCounter) {
            layerStylesPositionCounter = layer.stylesPositionCounter
        }
    }

    let carouselListStyle = {
        width: layerStylesLength + 'px',
        marginLeft: -(layerStylesPositionCounter * STYLE_WIDTH) + 'px',
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
                    {
                        layer && layer.styles ?
                            layer.styles.map((style, indexStyle) => {
                                return (
                                    <LayerStyleItem
                                        layer={layer}
                                        style={style}
                                        key={indexStyle}
                                        index={indexStyle}
                                        onStyleClick={onStyleClick}
                                        onStyleMouseOver={onStyleMouseOver}
                                        onStyleMouseOut={onStyleMouseOut}
                                    />
                                )
                            })
                        : ''
                    }
                </ul>
            </div>
            <a role="button" className={rightArrowClassName} onClick={arrowRightClick}></a>
        </div>
    )
}

export default LayerStylesCarousel
