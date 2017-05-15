import axios from 'axios';

const WORKSPACE = 'plataforma';
const ENDPOINT  = `/geoserver/${WORKSPACE}/wms`;

// styles constants
const ICON_SIZE      = { x: 27,  y: 20  };
const THUMB_SIZE     = { x: 225, y: 150 };
const TOOLTIP_SIZE   = 750;
const PROJECTION     = 'EPSG:3857';
const ICON_THUMB_URL = './resources/img/plataforma/icones/';

const GeoAPI = {

    /**
    * Parse XML from GeoServer
    */

    workspace: 'plataforma',
    restricted: false,
    layers: [],
    menu: [],

    /**
    * Call GeoServer and get XML data
    * @param callback function to call when data is fully loaded
    */
    getContent(callback) {
        axios
            .get(ENDPOINT + '?request=GetCapabilities')
            .then((response) => {
                GeoAPI.parseXMLResponse(response, callback);
            })
            .catch((error) => {
                return console.log(error);
            })
        ;
    },

    /**
     * Parses XML response from GeoServer, creating a layers array
     * @param response response from GeoServer API (as XML)
     * @param callback function to call when data is processed
     */
    parseXMLResponse(response, callback){
        GeoAPI.layers = [];

        // adds iterators to XML nodes, so we can run forEach on them
        NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
        HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

        // get root layers node, and parse layer data for each layer
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(response.data, 'text/xml');
        xmlDoc.firstElementChild.childNodes.forEach((rootChildrenNode) => {
            if (rootChildrenNode.nodeName === 'Capability') {
                rootChildrenNode.childNodes.forEach( (capabilityChildrenNode) => {
                    if (capabilityChildrenNode.nodeName === 'Layer') {
                        capabilityChildrenNode.childNodes.forEach((rootLayerChildrenNode) => {
                            if (rootLayerChildrenNode.nodeName === 'Layer') {
                                GeoAPI.parseLayerNode(rootLayerChildrenNode);
                            }
                        });
                    }
                });
            }
        });

        // create menu data
        GeoAPI.menu = GeoAPI.createMenu(GeoAPI.layers);

        // call callback function with data processed
        callback({
            menu:   GeoAPI.menu,
            layers: GeoAPI.layers
        });
    },

    /**
    * Parses XML node for a single layer, populating GeoAPI.layers array.
    * @param xmlNode XML node with a GeoServer layer
    */
    parseLayerNode(xmlNode) {
        if(GeoAPI.isValidLayer(xmlNode)) {
            let caops = [];
            let menu = '';
            let menu2 = '';
            let name, title, abstract;

            // gets name, title, abstract, and keywords for caops and menu
            xmlNode.childNodes.forEach((layerChildrenNode) => {
                switch (layerChildrenNode.nodeName) {
                    case 'Name':
                        name = layerChildrenNode.textContent;
                    break;
                    case 'Title':
                        title = layerChildrenNode.textContent;
                    break;
                    case 'Abstract':
                        abstract = layerChildrenNode.textContent;
                    break;
                    case 'KeywordList':
                        layerChildrenNode.childNodes.forEach( (keywordNode) => {
                            if (keywordNode.nodeName === 'Keyword') {
                                let caopsArray = keywordNode.textContent.split("cao:");
                                let menuArray  = keywordNode.textContent.split("menu:");
                                let menuArray2 = keywordNode.textContent.split("menu2:");

                                if (caopsArray[1]) {
                                    caops.push(caopsArray[1]);
                                }
                                if (menuArray[1]) {
                                    menu = menuArray[1];
                                }
                                if (menuArray2[1]) {
                                    menu2 = menuArray2[1];
                                }
                            }
                        });
                    break;
                }
            });

            // create layer object
            var layer = {
                id:         `${GeoAPI.workspace}_${name}`,
                name:        name,
                title:       title,
                workspace:   GeoAPI.workspace,
                display:     true,
                restricted:  GeoAPI.restricted,
                layerName:  `${GeoAPI.workspace}:${name}`,
                description: abstract,
                bbox:        GeoAPI.parseBoundingBox(xmlNode),
                caops:       caops,
                menu:        menu,
                menu2:       menu2,
                key:         GeoAPI.layers.length
            }

            // get layer styles
            layer.styles = GeoAPI.parseStyle(xmlNode, layer);

            // add to layers array
            GeoAPI.layers.push(layer);
        }
    },

    /**
    * Check if the given XML node represents a valid layer.
    * The layers we use must have a KeywordList node, with at least one element inside.
    * @param xmlNode XML node with a GeoServer layer
    * @returns {Boolean}
    */
    isValidLayer(xmlNode) {
        let ret = false;

        xmlNode.childNodes.forEach((layerChildrenNode) => {
            if (layerChildrenNode.nodeName === 'KeywordList' && layerChildrenNode.children.length > 0) {
                if (ret === false) {
                    ret = true;
                }
            }
        });

        return ret;
    },

    /**
     * Returns bounding box for a given layer
     * @param xmlNode XML node with a GeoServer layer
     * @return {String} bounding box string: minX,minY,maxX,maxY
     */
    parseBoundingBox(xmlNode){
        let boundingBox = xmlNode.getElementsByTagName('BoundingBox')[0];

        let minX = boundingBox.attributes.minx.value;
        let minY = boundingBox.attributes.miny.value;
        let maxX = boundingBox.attributes.maxx.value;
        let maxY = boundingBox.attributes.maxy.value;

        return `${minX},${minY},${maxX},${maxY}`;
    },

    /**
     * Returns styles array
     * @param xmlNode XML node with a GeoServer layer
     * @param layer object with parsed layer data
     * @return {Object[]} Styles array
     */
    parseStyle(xmlNode, layer){
        let styles = [];
        const styleCollection = xmlNode.getElementsByTagName('Style');

        for (let i=0, l=styleCollection.length; i<l; i++) {
            let style = styleCollection[i];

            let nameTags       = style.getElementsByTagName('Name');
            let titleTags      = style.getElementsByTagName('Title');
            let abstractTags   = style.getElementsByTagName('Abstract');
            let legendURLTags  = style.getElementsByTagName('LegendURL');

            let styleName      = nameTags.length      ? nameTags[0].textContent      : '';
            let styleTitle     = titleTags.length     ? titleTags[0].textContent     : '';
            let styleAbstract  = abstractTags.length  ? abstractTags[0].textContent  : '';
            let styleLegendURL = legendURLTags.length ? legendURLTags[0].textContent : '';

            let iconSize   = `&width=${ICON_SIZE.x}&height=${ICON_SIZE.y}`;
            let thumbSize  = `&width=${THUMB_SIZE.x}&height=${THUMB_SIZE.y}`;
            let iconURL    = `${ENDPOINT}?service=WMS&version=1.1.0&request=GetMap&bbox=${layer.bbox}${iconSize}&ssrs=${PROJECTION}&format=image%2Fpng&layers=${layer.layerName}&singleTile=true&styles=${styleName}`;
            let thumbURL   =  iconURL.replace(iconSize, thumbSize);
            let iconExt    = `_${ICON_SIZE.x}_${ICON_SIZE.y}.png`;
            let thumbExt   = `_${THUMB_SIZE.x}_${THUMB_SIZE.y}.png`;
            let iconURL_2  =  ICON_THUMB_URL + layer.layerName.replace(':','_') + '-' + styleName.replace(':','_') + iconExt;
            let thumbURL_2 =  iconURL_2.replace(iconExt, thumbExt);
            let tooltip    = `<span style="width:${TOOLTIP_SIZE}px;"><img src="${thumbURL_2}" onError="this.onerror=null;this.src='${thumbURL}'" width="${THUMB_SIZE.y}" class="estilo-tooltip"/><strong>${layer.title}</strong><br>${styleTitle}</span>`;

            let styleObj = {
                'id'          : i,
                'title'       : styleTitle,
                'name'        : styleName,
                'description' : styleAbstract,
                'icon'        : iconURL,       // icon generated by GeoServer dynamically
                'icon_2'      : iconURL_2,     // cached icon
                'thumb'       : thumbURL,      // thumb generated by GeoServer dynamically
                'thumb_2'     : thumbURL_2,    // cached thumb
                'tooltip'     : tooltip
            };

            styles.push(styleObj);
        }

        return styles;
    },

    /**
    * Creates menu array
    * @param   {Object[]} layers Array of layers
    * @returns {Object[]} Menu array with categories data, including layers IDs
    */
    createMenu(layers) {
        var menu = [];

        layers.forEach((layer) => {
            // creates menu item if it doesn't exists
            var menuFound = false;
            menu.forEach((menuItem) => {
                if (menuItem.id === layer.menu2) {
                    menuFound = true;
                }
            });
            if (!menuFound) {
                if (layer.menu2.trim() !== "") {
                    menu.push({
                        display: true,
                        id: layer.menu2,
                        title: layer.menu2,
                        layers: [],
                        idMenu: menu.length
                    });
                }
            }

            // then add the layer ID to an array of its menu item
            menu.forEach((menuItem) => {
                if (menuItem.id === layer.menu2) {
                    menuItem.layers.push(layer.key);
                }
            });
        });

        // finally, sort menu categories in A-Z
        menu.sort((a, b)=>{
            if(a.title < b.title) {
                return -1
            }

            if(a.title > b.title) {
                return 1
            }

            return 0;
        });

        return menu;
    }
}

export default GeoAPI;
