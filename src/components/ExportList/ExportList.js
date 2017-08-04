import React from 'react'
import html2canvas from 'html2canvas'

const ExportList = ({layers}) => {
    function exportMapData(layers, format) {
        layers.filter(layer => {
            if (layer.selected) {
                let link = document.createElement('a')
                let url = `http://apps.mprj.mp.br/geoserver/plataforma/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${layer.layerName}&SRSNAME=EPSG:4326&outputFormat=${format}&CQL_FILTER=(BBOX(geom,${layer.bbox},%27EPSG:4326%27))&format_options=CHARSET:UTF-8`

                link.setAttribute('href', url)
                link.setAttribute('download', `${layer.name}.xlsx`)
                link.click()
            }
        })
    }

    function exportMapImage() {
        html2canvas(document.body, {
			onrendered: function(canvas) {
                let link = document.createElement('a')
                let url = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream')

                link.setAttribute('href', url)
                link.setAttribute('download', 'mp_em_mapas.jpg')
                link.click()
		  	}
		})
    }

    return (
        <ul className="export-list">
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapImage()}>Imagem (jpg)</a>
            </li>
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
