// Adding the tile layer
let base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
let night = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
);

let url =
  "https://raw.githubusercontent.com/angiecfoust/tornado_vis/main/static/final_data.geojson";

let tornadoAlley =
  "https://raw.githubusercontent.com/angiecfoust/tornado_vis/main/tornadoAlley.geojson";


// Create a baseMap to hold the base and add to map.
let baseMaps = {
  Base: base,
};
//Create overlaymap to hold tornado locations.
let overlayMaps = {
  Night: night,
};

// Build the map
let myMap = L.map("map", {
  center: [38, -98.5795],
  zoom: 5,
  layers: [base],
});

//add the tornado alley polygon
d3.json(tornadoAlley).then((geodata) => {
  let alley = L.geoJson(geodata, {
    style: {
      color: "red",
      opacity: 0.5,
      fill: true,
    },
  });
  layerControl.addOverlay(alley, "Tornado Alley");
});



// Add the layer control
let layerControl = L.control
  .layers(baseMaps, overlayMaps, { collapsed: false })
  .addTo(myMap);


//  Add Heat Points to the map
d3.json(url).then(function (response) {
  console.log(response);
  features = response.features;
  let heatArray = [];
  for (let i = 0; i < features.length; i++) {
    let location = features[i].geometry;
    if (location) {
      //console.log(location);
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }
  let heat = L.heatLayer(heatArray, {
    radius: 10,
    blur: 3,
    minIntensity: 1,
    scaleRadius: true,
    minOpacity: 0.3,
    opacity: 0,
  }).addTo(myMap);
});

// add slider layer
let sliderControl = L.control.sliderControl({position: "topright", layer: base, follow: 1});

// add slider to map
map.addControl(sliderControl);

// initialize slider
sliderControl.startSlider();
$('#slider-timestamp').html(options.markers[ui.value].feature.properties.year.substr(0,4));

// features > properties > year