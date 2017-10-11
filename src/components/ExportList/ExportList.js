import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const ExportList = ({layers, mapProperties}) => {
    /**
     *
     * @param {object} layers - The active layers
     * @param {string} format - The format used to export data from Geoserver
     */
    function exportMapData(layers, mapProperties, format) {
        layers.filter(layer => {
            if (layer.selected) {

                let CQL_FILTER = `(BBOX(geom,${layer.bbox},'EPSG:4326'))`

                if (mapProperties.placeToCenter && mapProperties.placeToCenter.tipo !== 'ESTADO') {
                    let layerCQLFilterParameter = 'cod_' + mapProperties.placeToCenter.tipo.toLowerCase()
                    if (mapProperties.placeToCenter.tipo === 'MUNICIPIO') {
                        layerCQLFilterParameter = 'cod_mun'
                    }
                    let geom = `'tipo=''${mapProperties.placeToCenter.tipo}'' and ${layerCQLFilterParameter}=''${mapProperties.placeToCenter['cd_'+mapProperties.placeToCenter.tipo.toLowerCase()]}''`

                    CQL_FILTER = "INTERSECTS(geom, querySingle('plataforma:busca_regiao', 'geom'," + geom + "'))"
                }

                let link = document.createElement('a')
                let url = `http://apps.mprj.mp.br/geoserver/plataforma/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${layer.layerName}&SRSNAME=EPSG:4326&outputFormat=${format}&CQL_FILTER=${CQL_FILTER}&format_options=CHARSET:UTF-8`

                link.setAttribute('href', url)
                link.setAttribute('download', `${layer.name}.${format === "excel2007" ? "xlsx" : format}`)
                link.click()
            }
        })
    }

    /**
     * The function exports the map as a image using the lib HTML2Canvas.
     * It captures the document body, put on a canvas element and downloads as a jpg image file.
     */
    function exportMapImage() {
        const mapLayers = document.querySelectorAll(".leaflet-tile-container") // Selection of the exactly div

        mapLayers.forEach(mapLayer => {
            if (mapLayer.firstElementChild.getAttribute('src').includes('retangulo')) {
                mapLayer.parentElement.style.opacity = 1
                console.log("mapLayer children", mapLayer.children)
                mapLayer.children.forEach(mapLayerChildren => mapLayerChildren.style.opacity = 0.5)
            }
        })

        html2canvas(document.body, {
            useCORS: true, // CORS must be active to render the base map on canvas element
			onrendered: function(canvas) {
                let link = document.createElement('a')
                let url = canvas.toDataURL('image/png')

                link.setAttribute('href', url)
                link.setAttribute('download', 'mp_em_mapas.png')
                link.click()
		  	},
        })

        mapLayers.forEach(mapLayer => {
            if (mapLayer.firstElementChild.getAttribute('src').includes('retangulo')) {
                mapLayer.parentElement.style.opacity = 0.5
                console.log("mapLayer children", mapLayer.children)
                mapLayer.children.forEach(mapLayerChildren => mapLayerChildren.style.opacity = 1)
            }
        })

    }

    /**
     * The function exports the map as a image using the lib HTML2Canvas.
     * It captures the document body, put on a canvas element and downloads as a jpg image file.
     */
    function exportMapPDF() {
        const mapLayers = document.querySelectorAll(".leaflet-tile-container") // Selection of the exactly div

        mapLayers.forEach(mapLayer => {
            if (mapLayer.firstElementChild.getAttribute('src').includes('retangulo')) {
                mapLayer.parentElement.style.opacity = 1
                console.log("mapLayer children", mapLayer.children)
                mapLayer.children.forEach(mapLayerChildren => mapLayerChildren.style.opacity = 0.5)
            }
        })

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

        mapLayers.forEach(mapLayer => {
            if (mapLayer.firstElementChild.getAttribute('src').includes('retangulo')) {
                mapLayer.parentElement.style.opacity = 1
                console.log("mapLayer children", mapLayer.children)
                mapLayer.children.forEach(mapLayerChildren => mapLayerChildren.style.opacity = 0.5)
            }
        })
    }

    return (
        <ul className="export-list">
            <li>
                <a className="export-list--link" role="button" onClick={() => exportMapImage()}>Imagem (jpg)</a>
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
                <a className="export-list--link" role="button" onClick={() => exportMapData(layers, mapProperties, "SHAPE-ZIP")}>Shape File</a>
            </li>
        </ul>
    )
}

export default ExportList
