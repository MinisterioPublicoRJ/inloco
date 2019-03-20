const BASE_MAPS_MOCK = [
    {
        name: 'osm-mapbox-light',
        image: require('../../../assets/img/basemap-mapbox-light.png'),
        subtitle: 'Fundo claro (OpenStreetMap / Mapbox Light)',
    },
    {
        name: 'osm-mapbox-dark',
        image: require('../../../assets/img/basemap-mapbox-dark.png'),
        subtitle: 'Fundo escuro (OpenStreetMap / Mapbox Dark)',
    },
    {
        name: 'osm',
        image: require('../../../assets/img/basemap-osm.png'),
        subtitle: 'OpenStreetMap',
    },
    {
        name: 'mapbox-terrain',
        image: require('../../../assets/img/basemap-mapbox-terrain.png'),
        subtitle: 'Terreno (OpenStreet / Mapbox / Natural Earth)'
    },
    {
        name: 'mapbox-satellite',
        image: require('../../../assets/img/basemap-mapbox-satellite.png'),
        subtitle: 'Imagens de Satélite (Mapbox)'
    },
]

export default BASE_MAPS_MOCK
