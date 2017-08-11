const BASE_MAPS_MOCK = [
    {
        name: 'OSM',
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        image: require('../../../assets/img/basemap-osm.png'),
    },
    {
        name: 'Mapbox Light',
        url: 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJsaW5kbyIsImEiOiJjaWljZDgwemYwMGFydWJrc2FlNW05ZjczIn0.rOROEuNNxKWUIcj6Uh4Xzg',
        image: require('../../../assets/img/basemap-mapbox-light.png'),
    },
]

export default BASE_MAPS_MOCK
