import React from 'react'

const ExportList = ({layers}) => {
    function exportMapData(layers) {
        let link = document.createElement('a')
        let url = ''

        layers.filter(layer => {
            if (layer.selected) {
                url = `http://apps.mprj.mp.br/geoserver/plataforma/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${layer.name}&outputFormat=excel2007&CQL_FILTER=BBOX(geom,${layer.bbox})`
                link.setAttribute('href', url);
                link.click();
            }
        })
    }
    return (
        <ul className="export-list">
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers)}>Planilha (csv)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers)}>Planilha (xlsx)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers)}>Google Earth (kml)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers)}>Shape File</a>
            </li>
        </ul>
    )
}

export default ExportList
