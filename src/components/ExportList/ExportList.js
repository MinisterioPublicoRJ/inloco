import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const ExportList = ({layers, mapProperties}) => {

    /**
     * Opacity fixes that needs to be done before html2canvas() call
     */
    function html2canvasBefore() {
        const mapLayers = document.querySelectorAll(".leaflet-tile-container")
        mapLayers.forEach(mapLayer => {
            let fec = mapLayer.firstElementChild
            let src = fec.getAttribute('src')
            if (src && src.includes('retangulo')) {
                mapLayer.parentElement.style.opacity = 1
                mapLayer.children.forEach(mapLayerChildren => mapLayerChildren.style.opacity = 0.5)
            }
        })
    }

    /**
     * Opacity fixes that needs to be done after html2canvas() call
     */
    function html2canvasAfter() {
        const mapLayers = document.querySelectorAll(".leaflet-tile-container")
        mapLayers.forEach(mapLayer => {
            let fec = mapLayer.firstElementChild
            let src = fec.getAttribute('src')
            if (src && src.includes('retangulo')) {
                mapLayer.parentElement.style.opacity = 0.5
                mapLayer.children.forEach(mapLayerChildren => mapLayerChildren.style.opacity = 1)
            }
        })
    }

    /**
     * Call download of given URL with specified filename
     * @param {string} url - The URL to be downloaded
     * @param {string} filename - The name of the file to be downloaded
     */
    function callDownload(url, filename) {
        let link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', filename)
        // On Firefox .click() require node to be on DOM tree
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
    }

    /**
     *
     * @param {object} layers - The active layers
     * @param {string} format - The format used to export data from Geoserver
     */
    function exportMapData(layers, mapProperties, format) {
        layers.filter(layer => {
            if (layer.selected) {

                // get area visible on the screen
                let CQL_FILTER = `(BBOX(geom,${mapProperties.currentCoordinates.bounds._southWest.lng},${mapProperties.currentCoordinates.bounds._southWest.lat},${mapProperties.currentCoordinates.bounds._northEast.lng},${mapProperties.currentCoordinates.bounds._northEast.lat},'EPSG:4326'))`

                // if an area was selected on Global Filter
                if (mapProperties.placeToCenter && mapProperties.placeToCenter.tipo !== 'ESTADO') {
                    let layerCQLFilterParameter = 'cod_' + mapProperties.placeToCenter.tipo.toLowerCase()
                    if (mapProperties.placeToCenter.tipo === 'MUNICIPIO') {
                        layerCQLFilterParameter = 'cod_mun'
                    }
                    let geom = `'tipo=''${mapProperties.placeToCenter.tipo}'' and ${layerCQLFilterParameter}=''${mapProperties.placeToCenter['cd_'+mapProperties.placeToCenter.tipo.toLowerCase()]}''`

                    // use it instead
                    CQL_FILTER = "INTERSECTS(geom, querySingle('plataforma:busca_regiao', 'geom'," + geom + "'))"
                }

                // if the layer is filtered
                if (layer.filterKey && layer.filterValue) {
                    CQL_FILTER += `AND strToLowerCase(${layer.filterKey}) LIKE '%25${layer.filterValue}%25'`
                }

                let url = `http://apps.mprj.mp.br/geoserver/plataforma/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${layer.layerName}&SRSNAME=EPSG:4326&outputFormat=${format}&CQL_FILTER=${CQL_FILTER}`
                let filename = `${layer.name}.${format === "excel2007" ? "xlsx" : format}`

                // shapefile download breaks with charset
                if (format !== 'SHAPE-ZIP') {
                    url += '&format_options=CHARSET:UTF-8'
                }

                callDownload(url, filename)

                // show charset alert for shapefile
                if (format === 'SHAPE-ZIP') {
                    alert('Ao abrir o shapefile selecione o charset "ISO-8859-1".')
                }
            }
        })
    }

    /**
     * The function exports the map as a image using the lib HTML2Canvas.
     * It captures the document body, put on a canvas element and downloads as a jpg image file.
     */
    function exportMapImage() {
        html2canvasBefore()
        html2canvas(document.body, {
            useCORS: true, // CORS must be active to render the base map on canvas element
			onrendered: function(canvas) {
                let url = canvas.toDataURL('image/png')
                callDownload(url, 'mp_em_mapas.png')
		  	},
        })
        html2canvasAfter()
    }

    /**
     * The function exports the map as a image using the lib HTML2Canvas.
     * It captures the document body, put on a canvas element and downloads as a jpg image file.
     */
    function exportMapPDF() {
        html2canvasBefore()
        html2canvas(document.body, {
            useCORS: true, // CORS must be active to render the base map on canvas element
			onrendered: function(canvas) {
                let imgData = canvas.toDataURL('image/png')
                let doc = new jsPDF('l', 'mm', 'a4')

                // Scale the canvas image of the application to an A4 landscape size
                doc.addImage(imgData, 'PNG', 0, 0, 297, 210)
                doc.save('mp_em_mapas.pdf')
		  	},
        })
        html2canvasAfter()
    }

    return (
        <ul className="export-list">
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapImage()}>Imagem (png)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapPDF()}>Documento (pdf)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers, mapProperties, "csv")}>Planilha (csv)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers, mapProperties, "excel2007")}>Planilha (xlsx)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers, mapProperties, "kml")}>Google Earth (kml)</a>
            </li>
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers, mapProperties, "SHAPE-ZIP")}>Shape File (shp)</a>
            </li>
        </ul>
    )
}

export default ExportList
