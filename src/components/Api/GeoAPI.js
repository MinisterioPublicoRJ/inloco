import axios from 'axios';
import L from 'leaflet';

/**
* Biblioteca para fazer as chamadas ao Geoserver
*/
const GeoAPI = {

    /**
    * Função para fazer o parse do XML obtido
    * @return Console log das layers do XML
    */

    // parseXML(xmlAjaxResult) {
    //     var parser = new DOMParser();
    //     var xmlDoc = parser.parseFromString(xmlAjaxResult, "text/xml");
    //     return xmlDoc.getElementsByTagName('Layer');
    // },

    workspace: 'plataforma',
    restrito: false,
    camadas: [],

    isValidLayer(xmlNode){
        var ret = false;
        xmlNode.childNodes.forEach( (layerChildrenNode) => {
            if(layerChildrenNode.nodeName === 'KeywordList' && layerChildrenNode.children.length > 0){
                if(ret === false){
                    ret = true;
                }
            }
        } );
        return ret;
    },

    parseLayerNode(xmlNode){
        if( GeoAPI.isValidLayer(xmlNode) ){
            var caops = [];
            var menu = '';
            var name, title, abstract;

            xmlNode.childNodes.forEach( (layerChildrenNode) => {
                switch(layerChildrenNode.nodeName){
                    case 'Name':
                        name = layerChildrenNode.textContent;
                        break;
                    case 'Title':
                        title = layerChildrenNode.textContent;
                        break;
                    case 'Abstract':
                        abstract = layerChildrenNode.textContent;
                        break;
                }
            } );

            // CAO e Menu
            xmlNode.childNodes.forEach( (layerChildrenNode) => {
                if(layerChildrenNode.nodeName === 'KeywordList') {
                    layerChildrenNode.childNodes.forEach( (keywordNode) => {
                        if (keywordNode.nodeName === 'Keyword') {
                            var caopsArray = keywordNode.textContent.split("cao:");
                            if (caopsArray[1]) {
                                caops.push(caopsArray[1]);
                            }
                            var menuArray = keywordNode.textContent.split("menu:");
                            if (menuArray[1]){
                                menu = menuArray[1];
                            }
                        }
                    } );
                }
            });

            var camada = {
                id:`${GeoAPI.workspace}_${name}`,
                name: name,
                title: title,
                workspace: GeoAPI.workspace,
                display: true,
                restrito: GeoAPI.restrito,
                layerName: `${GeoAPI.workspace}:${name}`,
                layerName: '',
                description: abstract,
                bbox: `${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.minx.value},${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.miny.value},${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.maxx.value},${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.maxy.value}`,
                caops: caops,
                menu: menu,
                estilos: []
            }

            // Estilo
            var styleCollection = xmlNode.getElementsByTagName('Style');
            for(var i=0, l=styleCollection.length; i<l; i++){
                var style = styleCollection[i];

                var nameTags       = style.getElementsByTagName('Name');
                var titleTags      = style.getElementsByTagName('Title');
                var abstractTags   = style.getElementsByTagName('Abstract');
                var legendURLTags  = style.getElementsByTagName('LegendURL');

                var styleName      = nameTags.length      ? nameTags[0].textContent      : '';
                var styleTitle     = titleTags.length     ? titleTags[0].textContent     : '';
                var styleAbstract  = abstractTags.length  ? abstractTags[0].textContent  : '';
                var styleLegendURL = legendURLTags.length ? legendURLTags[0].textContent : '';

                var tam_icone ='&width=27&height=20';
                var tam_thumb ='&width=225&height=150';
                var url_icone = '/geoserver/plataforma/wms?service=WMS&version=1.1.0&request=GetMap&bbox='+ camada.bbox + tam_icone +'&ssrs=EPSG:3857&format=image%2Fpng&layers='+ camada.layerName +'&singleTile=true&styles='+styleName;

                var url_icone_2 = './resources/img/plataforma/icones/'+ camada.layerName.replace(':','_')+'-'+ styleName.replace(':','_') +'_27_20.png';
                var url_thumb_2 = './resources/img/plataforma/icones/'+ camada.layerName.replace(':','_')+'-'+ styleName.replace(':','_') +'_225_150.png';

                var url_thumb = url_icone.replace(tam_icone,tam_thumb)
                var tooltip = "<span style='width:750px;'><img src='"+url_thumb_2+"' onError='this.onerror=null;this.src=\""+ url_thumb +"\";'  width='150' class='estilo-tooltip'/><strong>"+ camada.title +"</strong><br>"+styleTitle+"</span>"
                var estilo = {
                    'id':i,
                    'title':styleTitle,
                    'name':styleName,
                    'description':styleAbstract,
                    'icon':url_icone,
                    'icon_2':url_icone_2,
                    'thumb':url_thumb,
                    'thumb_2':url_thumb_2,
                    'tooltip':tooltip
                };
                camada.estilos.push(estilo);
            }

            GeoAPI.camadas.push(camada);
        }
    },

    /**
    * Função que chama o WMS
    * @return Objeto convertido do XML
    */
    getContent() {
        const workspace = 'plataforma';
        const endpoint = "/geoserver/" + workspace + "/wms?";

        GeoAPI.camadas = [];

        axios.get(endpoint + "request=GetCapabilities")
        .then((response) => {
            NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
            HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

            console.log(response);
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(response.data, "text/xml");
            console.log(xmlDoc);
            xmlDoc.firstElementChild.childNodes.forEach( (rootChildrenNode) => {
                console.log(rootChildrenNode);
                if(rootChildrenNode.nodeName === 'Capability'){
                    rootChildrenNode.childNodes.forEach( (capabilityChildrenNode) => {
                        if(capabilityChildrenNode.nodeName === 'Layer'){
                            capabilityChildrenNode.childNodes.forEach( (rootLayerChildrenNode) => {
                                if(rootLayerChildrenNode.nodeName === 'Layer'){
                                    GeoAPI.parseLayerNode(rootLayerChildrenNode);
                                }
                            } );
                        }
                    } );
                }
            } );
            console.log(GeoAPI.camadas);
            GeoAPI.menu = GeoAPI.montaMenu(GeoAPI.camadas);
            console.log(GeoAPI.menu);



            // // debugger;
            // NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
            // HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

            // /**
            // * Função que retorna o conteúdo de uma tag do XML
            // * @param {string} tagName - Nome da tag do XML cujo valor deve ser retornado
            // * @param {object} item - Item do objeto XML iterado
            // * @return String
            // */
            // function getText(tagName, item){
            //     var tagsList = item.getElementsByTagName(tagName)[0];
            //     if (tagsList){
            //         return item.getElementsByTagName(tagName)[0].textContent;
            //     } else {
            //         return "";
            //     }
            // }

            // var camadas = [];
            // var workspace = 'plataforma'
            // var restrito = false;
            // var xmlObject = this.parseXML(response.data);
            // console.log(xmlObject);
            // for (var item of xmlObject) {
            //     var caops = [];
            //     var menu = [];
            //     var camada = {
            //         id:`${workspace}_${getText('Name', item)}`,
            //         name: getText('Name', item),
            //         title: getText('Title', item),
            //         workspace: workspace,
            //         display: true,
            //         restrito: restrito,
            //         layerName: `${workspace}:${getText('Name', item)}`,
            //         description: getText('Abstract', item),
            //         bbox: `${item.getElementsByTagName('BoundingBox')[0].attributes.minx.value},${item.getElementsByTagName('BoundingBox')[0].attributes.miny.value},${item.getElementsByTagName('BoundingBox')[0].attributes.maxx.value},${item.getElementsByTagName('BoundingBox')[0].attributes.maxy.value}`,
            //         caops: caops,
            //         menu: menu,
            //         estilos: []
            //     }

            //     getText('KeywordList', item).split("\n").forEach( (myKeyword) => {
            //         myKeyword = myKeyword.trim();
            //         var caopsArray = myKeyword.split("cao:");
            //         if (caopsArray[1]) {
            //             caops.push(caopsArray[1]);
            //         }
            //         var menuArray = myKeyword.split("menu:");
            //         if (menuArray[1]){
            //             menu.push(menuArray[1]);
            //         }
            //     });

            //     // Estilo
            //     var styleCollection = item.getElementsByTagName('Style');
            //     const MAGIC_NUMBER = 10;
            //     if(styleCollection.length > 0 && styleCollection.length < MAGIC_NUMBER){
            //         for(var i=0, l=styleCollection.length; i<l; i++){
            //             var style = styleCollection[i];

            //             var nameTags       = style.getElementsByTagName('Name');
            //             var titleTags      = style.getElementsByTagName('Title');
            //             var abstractTags   = style.getElementsByTagName('Abstract');
            //             var legendURLTags  = style.getElementsByTagName('LegendURL');

            //             var styleName      = nameTags.length      ? nameTags[0].textContent      : '';
            //             var styleTitle     = titleTags.length     ? titleTags[0].textContent     : '';
            //             var styleAbstract  = abstractTags.length  ? abstractTags[0].textContent  : '';
            //             var styleLegendURL = legendURLTags.length ? legendURLTags[0].textContent : '';

            //             var tam_icone ='&width=27&height=20';
            //             var tam_thumb ='&width=225&height=150';
            //             var url_icone = '/geoserver/plataforma/wms?service=WMS&version=1.1.0&request=GetMap&bbox='+ camada.bbox + tam_icone +'&ssrs=EPSG:3857&format=image%2Fpng&layers='+ camada.layerName +'&singleTile=true&styles='+styleName;

            //             var url_icone_2 = './resources/img/plataforma/icones/'+ camada.layerName.replace(':','_')+'-'+ styleName.replace(':','_') +'_27_20.png';
            //             var url_thumb_2 = './resources/img/plataforma/icones/'+ camada.layerName.replace(':','_')+'-'+ styleName.replace(':','_') +'_225_150.png';

            //             var url_thumb = url_icone.replace(tam_icone,tam_thumb)
            //             var tooltip = "<span style='width:750px;'><img src='"+url_thumb_2+"' onError='this.onerror=null;this.src=\""+ url_thumb +"\";'  width='150' class='estilo-tooltip'/><strong>"+ camada.title +"</strong><br>"+styleTitle+"</span>"
            //             var estilo = {
            //                 'id':i,
            //                 'title':styleTitle,
            //                 'name':styleName,
            //                 'description':styleAbstract,
            //                 'icon':url_icone,
            //                 'icon_2':url_icone_2,
            //                 'thumb':url_thumb,
            //                 'thumb_2':url_thumb_2,
            //                 'tooltip':tooltip
            //             };
            //             camada.estilos.push(estilo);
            //         }
            //     }
            //     // /Estilo
            //     camadas.push(camada);
            // }
            // console.log(camadas);
        })
        .catch((error) => {
            return console.log(error);
        });
    },

    // TODO: Levar para outro componente
    montaMenu(camadas){
        var menu = {};



        return menu;
    }
}

export default GeoAPI;
