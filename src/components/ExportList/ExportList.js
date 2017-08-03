import React from 'react'

const ExportList = ({layers}) => {
    function exportMapData(layers, format) {
        layers.filter(layer => {
            if (layer.selected) {
                let link = document.createElement('a')
                let url = `http://apps.mprj.mp.br/geoserver/plataforma/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${layer.layerName}&SRSNAME=EPSG:4326&outputFormat=${format}&CQL_FILTER=(BBOX(geom,${layer.bbox},%27EPSG:4326%27))&format_options=CHARSET:UTF-8`
                console.log(layer.bbox)
                console.log(url)
                link.setAttribute('href', url);
                link.setAttribute('download', `${layer.name}.xlsx`);
                link.click();
            }
        })
    }
    return (
        <ul className="export-list">
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers, "csv")}>Planilha (csv)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers, "excel2007")}>Planilha (xlsx)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers, "kml")}>Google Earth (kml)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers, "SHAPE-ZIP")}>Shape File</a>
            </li>
        </ul>
    )
}

export default ExportList
