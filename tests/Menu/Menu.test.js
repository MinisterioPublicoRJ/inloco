import React from 'react';
import Menu from '../../src/components/Menu/Menu.js';

it('Menu component renders correctly with no data', () => {
    const component = shallow(<Menu/>);
    expect(component).toMatchSnapshot();
});

it('Menu component renders correctly with real data', () => {
    let mock = {
        "sidebarLeftWidth":37.859375,
        "sidebarLeftHeight":85.046875,
        "menuItems":[
            {
                "display":true,
                "id":"Assistência Social",
                "title":"Assistência Social",
                "layers":[1],
                "idMenu":1,
                "isSubMenu":false,
                "submenus":[],
                "selected":false,
                "match":true
            }
        ],
        "layers":[
            {
                "id":"plataforma_acterj_conselho_tutelar",
                "name":"acterj_conselho_tutelar",
                "title":"Conselho Tutelar",
                "workspace":"plataforma",
                "display":true,
                "restricted":false,
                "layerName":"plataforma:acterj_conselho_tutelar",
                "description":"Fontes: Associação dos Conselheiros Tutelares (ACTERJ). Contato: acterj@gmail.com/ http://www.acterj.org.br/ \r\nAno:2016.",
                "bbox":"-44.71388499999997,-23.223640999999986,-41.045743999999964,-20.96493900000002",
                "caops":["infancia","cidadania","educacao"],
                "menu":"assistencia",
                "menu2":["Assistência Social"],
                "key":0,
                "styles":[
                    {
                        "id":0,
                        "title":"Conselho Tutelar",
                        "name":"plataforma:conselho_tutelar",
                        "description":"Conselhos Tutelares registrados na ACTERJ e CEDCA",
                        "icon":"/geoserver/plataforma/wms?service=WMS&version=1.1.0&request=GetMap&bbox=-44.71388499999997,-23.223640999999986,-41.045743999999964,-20.96493900000002&width=27&height=20&ssrs=EPSG:3857&format=image%2Fpng&layers=plataforma:acterj_conselho_tutelar&singleTile=true&styles=plataforma:conselho_tutelar",
                        "icon_2":"./resources/img/plataforma/icones/plataforma_acterj_conselho_tutelar-plataforma_conselho_tutelar_27_20.png","thumb":"/geoserver/plataforma/wms?service=WMS&version=1.1.0&request=GetMap&bbox=-44.71388499999997,-23.223640999999986,-41.045743999999964,-20.96493900000002&width=225&height=150&ssrs=EPSG:3857&format=image%2Fpng&layers=plataforma:acterj_conselho_tutelar&singleTile=true&styles=plataforma:conselho_tutelar",
                        "thumb_2":"./resources/img/plataforma/icones/plataforma_acterj_conselho_tutelar-plataforma_conselho_tutelar_225_150.png","tooltip":"<span style=\"width:750px;\"><img src=\"./resources/img/plataforma/icones/plataforma_acterj_conselho_tutelar-plataforma_conselho_tutelar_225_150.png\" onError=\"this.onerror=null;this.src='/geoserver/plataforma/wms?service=WMS&version=1.1.0&request=GetMap&bbox=-44.71388499999997,-23.223640999999986,-41.045743999999964,-20.96493900000002&width=225&height=150&ssrs=EPSG:3857&format=image%2Fpng&layers=plataforma:acterj_conselho_tutelar&singleTile=true&styles=plataforma:conselho_tutelar'\" width=\"150\" class=\"estilo-tooltip\"/><strong>Conselho Tutelar</strong><br>Conselho Tutelar</span>"
                    }
                ],
                "selected":false,
                "match":true,
                "showDescription":false,
                "selectedLayerStyleId":0
            }
        ],
        "currentLevel":0
    }

    const component = shallow(<Menu/>);
    expect(component).toMatchSnapshot();
});
