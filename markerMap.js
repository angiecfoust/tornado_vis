const url = 'https://raw.githubusercontent.com/angiecfoust/tornado_vis/main/merged_tornado_data.geojson'


// Function to create the map
function createMap(tornado) {
    d3.json(url).then((data) => {

        console.log(data);

        // Add the map view tile
        let view = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        // Add a topographic view tile
        let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });


        // initializing layer group variables to hold the polylines
        let EF1 = L.layerGroup();
        let EF2 = L.layerGroup();
        let EF3 = L.layerGroup();
        let EF4 = L.layerGroup();
        let EF5 = L.layerGroup();
       
        // Create the base layer
        let baseMaps = {
            "Map View": view,
            "Topographic": topo,
        };

        // Create the overlay layer
        let overlayMaps = {
            "Tornadoes": tornado,
            'EF1': EF1,
            'EF2': EF2,
            'EF3': EF3,
            'EF4': EF4,
            'EF5': EF5
        };

        // Create the map
        let myMap = L.map("map", {
            center: [39.8283, -98.5795],
            zoom: 5,
            layers: [view, tornado]
        });

        // Create a layer control
        L.control.layers(baseMaps, overlayMaps).addTo(myMap);


////////////////////// LEGEND NEEDS WORK /////////////////////////////////////////////////////

// set up the legend 
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = ['EF1', 'EF2', 'EF3', 'EF4', 'EF5'];
    var colors = ['rgb(230,146,6)','rgb(253,127,4)','rgb(255,101,0)', 'rgb(249,0,1)', 'rgb(136,0,16)'];
    var labels = [];

    // Add min & max
    div.innerHTML = '<h2>EF rating</h2>' + '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
        labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div;
};

legend.addTo(myMap);

    })};
//////////////////////////////////////////////////////////////////////////
function tornadoMarkers(response) {

    d3.json(url).then((data) => {

        // Function to determine marker size
        function circleSize(TOR_WIDTH) {
            if (TOR_WIDTH < 201) {
                return TOR_WIDTH * 0.5
            } else if (TOR_WIDTH < 501) {
                return TOR_WIDTH * 1
            } else if (TOR_WIDTH < 1001) {
                return TOR_WIDTH * 1.5
            } else if (TOR_WIDTH < 2001) {
                return TOR_WIDTH * 2
            } else if (TOR_WIDTH < 3001) {
                return TOR_WIDTH * 2.5
            } else { return TOR_WIDTH * 2.9 }
        };

        // Function to determine marker color
        function circleColor(TOR_F_SCALE) {
            if (TOR_F_SCALE == 1) {
                return 'rgb(230,146,6)'
            } else if (TOR_F_SCALE == 2) {
                return 'rgb(253,127,4)'
            } else if (TOR_F_SCALE == 3) {
                return 'rgb(255,101,0)'
            } else if (TOR_F_SCALE == 4) {
                return 'rgb(249,0,1)'
            } else { return 'rgb(136,0,16)'}

        };
/////////////////////////////////////////////////////////////////////////////

        // Bind a popup to the marker that will display on being clicked. This will be rendered as HTML.
        function onEachFeature(features, layer) {
            layer.bindPopup(`<h4>Tornado Details</h4><hr/>\
            <small><b>Date/Time:</b> ${new Date(features.properties.BEGIN_DATE).toUTCString()}<br/>\
            <b>Location:</b> ${features.properties.BEGIN_LOCATION}<br/>\
            <b>Lat:</b> ${features.geometry.coordinates[1]}<br/>\
            <b>Long:</b> ${features.geometry.coordinates[0]}<br/>\
            <b>Tornado Width (ft):</b> ${features.properties.TOR_WIDTH}<br/>\
            <b>F Scale:</b> ${features.properties.TOR_F_SCALE}</small>`
            )
        };

        // Function to create the circle
        function createMarker(geoJsonPoint, coords) {
            return L.circleMarker(coords, {
                radius: circleSize(geoJsonPoint.properties.TOR_F_SCALE),
                weight: 1,
                color: '',
                fillColor: circleColor(geoJsonPoint.properties.TOR_F_SCALE),
                fillOpacity: 0.9
            });
        };

        // Connect the earthquake data with the circle markers
        let tornado_markers = L.geoJson(response, {
            pointToLayer: createMarker,
            onEachFeature: onEachFeature
        });

///////////////// FIX EF SCALE FILTER /////////////////////////////

// creating EF scale filter
        // adding markers to layer groups
        for (let i = 0; i < tornado_markers.length; i++) {

        if (circleColor == 'rgb(230,146,6)'){
            tornado_markers[i].addTo(EF1)
        }
        else if (circleColor == 'rgb(253,127,4)'){
            tornado_markers[i].addTo(EF2)
        }
        else if (circleColor == 'rgb(255,101,0)'){
            tornado_markers[i].addTo(EF3)
        }
        else if (circleColor == 'rgb(249,0,1)'){
            tornado_markers[i].addTo(EF4)
        }
        else if (circleColor == 'rgb(136,0,16)'){
            tornado_markers[i].addTo(EF5)
        };

    };

        // Call functions to create the map and legend
        createMap(tornado_markers);
    });
};

d3.json(url).then(tornadoMarkers);