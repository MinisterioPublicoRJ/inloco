import React from 'react'

const BaseMapList = ({baseMaps, onChangeActiveBaseMap}) => {

    function handleChangeActiveBaseMap(baseMap) {
        return onChangeActiveBaseMap(baseMap)
    }

    return (
        <ul className="basemap-list">
            {
                // Checks if baseMaps already exists in state
                baseMaps
                ? baseMaps.map((baseMap, index) => {
                    return (
                        <li className="basemap-list--item" key={index}>
                            <a role="button" onClick={()=>handleChangeActiveBaseMap(baseMap)}>
                                <img src={baseMap.image} className="basemap-list--image" alt={`${baseMap.name} base map`}/>
                            </a>
                        </li>
                    )
                })
                : ''
            }
        </ul>
    )
}

export default BaseMapList
