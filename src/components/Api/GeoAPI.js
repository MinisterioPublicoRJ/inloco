import axios from 'axios';

const GeoAPI = {

    /**
    * Parse XML from GeoServer
    */

    workspace: 'plataforma',
    restricted: false,
    layers: [],
    menu: [],

    /**
    * Auxiliary function to check if the given XML node represents a valid layer.
    * The layers we use must have a KeywordList node, with at least one element inside.
    * @param xmlNode HTMLCollection with GeoServer layers
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
    * Parses XML node for a single layer, populating GeoAPI.layers array.
    * @param xmlNode HTMLCollection with a GeoServer layer
    */
    parseLayerNode(xmlNode) {
        if(GeoAPI.isValidLayer(xmlNode)) {
            var caops = [];
            var menu = '';
            var menu2 = '';
            var name, title, abstract;

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
                                var caopsArray = keywordNode.textContent.split("cao:");
                                if (caopsArray[1]) {
                                    caops.push(caopsArray[1]);
                                }
                                var menuArray = keywordNode.textContent.split("menu:");
                                if (menuArray[1]) {
                                    menu = menuArray[1];
                                }
                                var menuArray2 = keywordNode.textContent.split("menu2:");
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
                id:`${GeoAPI.workspace}_${name}`,
                name: name,
                title: title,
                workspace: GeoAPI.workspace,
                display: true,
                restricted: GeoAPI.restricted,
                layerName: `${GeoAPI.workspace}:${name}`,
                description: abstract,
                bbox: `${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.minx.value},${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.miny.value},${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.maxx.value},${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.maxy.value}`,
                caops: caops,
                menu: menu,
                menu2: menu2,
                styles: [],
                key: GeoAPI.layers.length
            }

            // get styles for layer
            var styleCollection = xmlNode.getElementsByTagName('Style');
            for (var i=0, l=styleCollection.length; i<l; i++) {
                var style = styleCollection[i];

                var nameTags       = style.getElementsByTagName('Name');
                var titleTags      = style.getElementsByTagName('Title');
                var abstractTags   = style.getElementsByTagName('Abstract');
                var legendURLTags  = style.getElementsByTagName('LegendURL');

                var styleName      = nameTags.length      ? nameTags[0].textContent      : '';
                var styleTitle     = titleTags.length     ? titleTags[0].textContent     : '';
                var styleAbstract  = abstractTags.length  ? abstractTags[0].textContent  : '';
                var styleLegendURL = legendURLTags.length ? legendURLTags[0].textContent : '';

                var iconSize  = '&width=27&height=20';
                var thumbSize = '&width=225&height=150';
                var iconURL = '/geoserver/plataforma/wms?service=WMS&version=1.1.0&request=GetMap&bbox=' + layer.bbox + iconSize + '&ssrs=EPSG:3857&format=image%2Fpng&layers=' + layer.layerName + '&singleTile=true&styles=' + styleName;
                var iconURL_2 = './resources/img/plataforma/icones/' + layer.layerName.replace(':','_') + '-' + styleName.replace(':','_') + '_27_20.png';
                var thumbURL_2 = './resources/img/plataforma/icones/' + layer.layerName.replace(':','_') + '-' + styleName.replace(':','_') + '_225_150.png';
                var thumbURL = iconURL.replace(iconSize, thumbSize);
                var tooltip = "<span style='width:750px;'><img src='" + thumbURL_2 + "' onError='this.onerror=null;this.src=\"" + thumbURL + "\";'  width='150' class='estilo-tooltip'/><strong>" + layer.title + "</strong><br>" + styleTitle + "</span>";
                var style = {
                    'id'          : i,
                    'title'       : styleTitle,
                    'name'        : styleName,
                    'description' : styleAbstract,
                    'icon'        : iconURL,
                    'icon_2'      : iconURL_2,
                    'thumb'       : thumbURL,
                    'thumb_2'     : thumbURL_2,
                    'tooltip'     : tooltip
                };
                layer.styles.push(style);
            }

            GeoAPI.layers.push(layer);
        }
    },

    /**
    * Call WMS and creates layers / menu array
    */
    getContent(myCallback) {
        const workspace = 'plataforma';
        const endpoint = '/geoserver/' + workspace + '/wms?';

        GeoAPI.layers = [];

        axios
            .get(endpoint + 'request=GetCapabilities')
            .then((response) => {
                NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
                HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

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
                GeoAPI.menu = GeoAPI.createMenu(GeoAPI.layers);
                myCallback({
                    menu: GeoAPI.menu,
                    layers: GeoAPI.layers
                });

            })
            .catch((error) => {
                return console.log(error);
            })
        ;
    },

    /**
    * Creates menu array
    * @param layers Array of layers
    * @returns {Object[]} Menu array with categories, with layers IDs
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

            // then add the layer ID to an array of it's menu item
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
