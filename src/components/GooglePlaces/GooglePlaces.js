import React, {Component} from 'react'

export default class GooglePlaces extends Component {
    constructor(props) {
        super(props)
    }

    preventSubmit(e) {
        e.preventDefault()
    }

    onPlacesChanged(searchBox) {
        var places = searchBox.getPlaces()
        var viewport = places[0].geometry.viewport

        var nelat = viewport.getNorthEast().lat()
        var nelng = viewport.getNorthEast().lng()
        var swlat = viewport.getSouthWest().lat()
        var swlng = viewport.getSouthWest().lng()

        return [
            [
                nelat, nelng
            ],
            [
                swlat, swlng
            ]
        ]
    }

    componentDidMount() {
        const { onAddGooglePlacesLatLong } = this.props
        const onPlacesChanged = this.onPlacesChanged

        const defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-23.3926, -44.8935),
            new google.maps.LatLng(-20.7916, -40.7384)
        )

        let input = document.getElementById("GooglePlacesSearch")
        let searchBox = new google.maps.places.SearchBox(input, {
            bounds: defaultBounds
        })

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            onAddGooglePlacesLatLong(onPlacesChanged(this))
        })
    }

    render() {
        return (
            <form
                action=""
                onSubmit={this.preventSubmit}
                className="google-places"
            >
                <label
                    htmlFor="GooglePlacesSearch"
                    className="google-places--label"
                >
                    Busca por ponto de interesse ou logradouro:
                </label>
                <input
                    type="text"
                    id="GooglePlacesSearch"
                    placeholder="Ex.: Estações de metrô, edifícios públicos...."
                    className="google-places--input"
                />
            </form>
        )
    }
}
