import axios from 'axios';
// import L from 'leaflet';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from '../App/App.js';
/**
* Biblioteca para fazer as chamadas ao Geoserver
*/
const GeoAPI = {

    /**
    * Função para fazer o parse do XML obtido
    * @return Console log das layers do XML
    */

    workspace: 'plataforma',
    restrito: false,
    camadas: [],
    menu: [],

    /**
    * Função para verificar se o XML é válido para o nosso tratamento.
    * As camadas que utilizamos possuem o nó KeywordList, mesmo que ele esteja vazio.
    * @param HTMLCollection com as camadas do Geoserver
    * @return Boolean
    */

    isValidLayer(xmlNode) {
        var ret = false;
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
    * Função para fazer o parse do XML obtido
    * @param HTMLCollection previamente tratado com as camadas do Geoserver
    * @return Objeto javascript tratado com os dados do XML
    */
    parseLayerNode(xmlNode) {
        if(GeoAPI.isValidLayer(xmlNode)) {
            var caops = [];
            var menu = '';
            var menu2 = '';
            var name, title, abstract;

            /**
            * Captura os dados dos nós Name, Title ou Abstract
            */
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
                }
            });

            /**
            * Captura os dados do nó KeywordList para montar a propriedade caops e o menu
            */
            xmlNode.childNodes.forEach((layerChildrenNode) => {
                if (layerChildrenNode.nodeName === 'KeywordList') {
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
                }
            });

            /**
            * Monta o objeto de camada
            */
            var camada = {
                id:`${GeoAPI.workspace}_${name}`,
                name: name,
                title: title,
                workspace: GeoAPI.workspace,
                display: true,
                restrito: GeoAPI.restrito,
                layerName: `${GeoAPI.workspace}:${name}`,
                description: abstract,
                bbox: `${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.minx.value},${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.miny.value},${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.maxx.value},${xmlNode.getElementsByTagName('BoundingBox')[0].attributes.maxy.value}`,
                caops: caops,
                menu: menu,
                menu2: menu2,
                estilos: [],
                idCamada: GeoAPI.camadas.length + 1
            }

            /**
            * Captura os estilos da camada
            */
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
    getContent(myCallback) {
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
            xmlDoc.firstElementChild.childNodes.forEach((rootChildrenNode) => {
                console.log(rootChildrenNode);
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
            console.log(GeoAPI.camadas);
            GeoAPI.menu = GeoAPI.montaMenu(GeoAPI.camadas);
            console.log(GeoAPI.menu);
            myCallback({
                menu: GeoAPI.menu,
                camadas: GeoAPI.camadas
            });
            // ReactDOM.render(<App menu={GeoAPI.menu} />, document.getElementById('app'));

        })
        // .catch((error) => {
        //     return console.log(error);
        // });
    },

    /**
    * Função que monta o menu de camadas
    * @param Objeto com as camadas
    * @return Objeto formatado do menu para ser renderizado posteriormente
    */
    montaMenu(camadas) {
        var menu = [];

        camadas.forEach((camada) => {
            var menuFound = false;
            menu.forEach((menuItem) => {
                if (menuItem.id === camada.menu2) {
                    menuFound = true;
                }
            });
            if (!menuFound) {
                if (camada.menu2.trim() !== "") {
                    menu.push({
                        display: true,
                        id: camada.menu2,
                        title: camada.menu2, // TODO trocar nome
                        camadas: [],
                        idMenu: menu.length + 1
                    });
                }
            }
            menu.forEach((menuItem) => {
                if (menuItem.id === camada.menu2) {
                    menuItem.camadas.push(camada.idCamada);
                }
            });
        });
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
