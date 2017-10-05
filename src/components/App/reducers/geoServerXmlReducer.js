import { parseBoundingBox, parseStyle } from './geoServerXmlStyleReducer'

const RESTRICTED = false
const WORKSPACE = __WORKSPACE__
const ENDPOINT = __API__

/**
 * Parses XML response from GeoServer, creating a layers array
 * @param response response from GeoServer API (as XML)
 */
const geoServerXmlReducer = (response) => {
    let layers = []

    // adds iterators to XML nodes, so we can run forEach on them
    NodeList.prototype.forEach = Array.prototype.forEach
    HTMLCollection.prototype.forEach = Array.prototype.forEach

    // get root layers node, and parse layer data for each layer
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(response.data, 'text/xml')
    xmlDoc.firstElementChild.childNodes.forEach((rootChildrenNode) => {
        if (rootChildrenNode.nodeName === 'Capability') {
            rootChildrenNode.childNodes.forEach( (capabilityChildrenNode) => {
                if (capabilityChildrenNode.nodeName === 'Layer') {
                    capabilityChildrenNode.childNodes.forEach((rootLayerChildrenNode) => {
                        if (rootLayerChildrenNode.nodeName === 'Layer') {
                            layers = parseLayerNode(rootLayerChildrenNode, layers)
                        }
                    })
                }
            })
        }
    })

    return layers
}

/**
* Parses XML node for a single layer, populating GeoAPI.layers array.
* @param xmlNode XML node with a GeoServer layer
* @param layers layers array we're building
*/
const parseLayerNode = (xmlNode, layers) => {
    if (isValidLayer(xmlNode)) {
        const charts = []
        const caops = []
        let menu = ''
        let menu2 = ''
        let name
        let title
        let abstract
        let table

        // gets name, title, abstract, and keywords for caops and menu
        xmlNode.childNodes.map(layerChildrenNode => {
            const nodeName = []
            nodeName['Nodes'] = () => null
            nodeName['Name'] = () => { name = layerChildrenNode.textContent }
            nodeName['Title'] = () => { title = layerChildrenNode.textContent }
            nodeName['Abstract'] = () => { abstract = layerChildrenNode.textContent }
            nodeName['KeywordList'] = () => {
                layerChildrenNode.childNodes.map(keywordNode => {
                    if (keywordNode.nodeName === 'Keyword') {
                        const keywordsArray = keywordNode.textContent.split(':')

                        if (keywordsArray[0] === 'cao') {
                            caops.push(keywordsArray[1])
                        }
                        if (keywordsArray[0] === 'tabela') {
                            table = JSON.parse(keywordsArray[1])
                        }
                        if (keywordsArray[0] === 'menu') {
                            menu = keywordsArray[1]
                        }
                        if (keywordsArray[0] === 'menu2') {
                            const menu2Array = [
                                keywordsArray[1]
                            ]
                            if (keywordsArray.length > 2) {
                                // copy all submenus
                                for (let i = 2, l = keywordsArray.length; i < l; i++) {
                                    menu2Array.push(keywordsArray[i])
                                }
                            }
                            menu2 = menu2Array
                        }
                        if (keywordsArray[0] === 'grafico') {
                            const chartData = keywordsArray[1].split('|')
                            const chartColumns = chartData[3].split(',')
                            for (let c = 0, lc = chartColumns.length; c < lc; c++) {
                                chartColumns[c] = chartColumns[c].split('/')
                            }
                            const chartObject = {
                                type: chartData[0],
                                title: chartData[1],
                                entity: chartData[2],
                                columns: chartColumns
                            }
                            charts.push(chartObject)
                        }
                    }
                })
            }

            nodeName[layerChildrenNode.nodeName]()
        })

        // create layer object
        var layer = {
            name,
            title,
            caops,
            menu,
            menu2,
            table,
            charts,
            id:         `${WORKSPACE}_${name}`,
            workspace:   WORKSPACE,
            display:     true,
            restricted:  RESTRICTED,
            layerName:  `${WORKSPACE}:${name}`,
            description: abstract,
            bbox:        parseBoundingBox(xmlNode),
            key:         layers.length,
        }

        // get layer styles
        layer.styles = parseStyle(xmlNode, layer)

        // add to layers array if they have a valid menu key (i.e. is published)
        if (menu) {
            layers.push(layer)
        }
    }

    return layers
}

/**
* Check if the given XML node represents a valid layer.
* The layers we use must have a KeywordList node, with at least one element inside.
* @param xmlNode XML node with a GeoServer layer
* @returns {Boolean}
*/
const isValidLayer = (xmlNode) => {
    let ret = false

    xmlNode.childNodes.forEach((layerChildrenNode) => {
        if (layerChildrenNode.nodeName === 'KeywordList' && layerChildrenNode.children.length > 0) {
            if (ret === false) {
                ret = true
            }
        }
    })

    return ret
}

export default geoServerXmlReducer
