// Store our API endpoint as quakeUrl.
let quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the quakeUrl.
d3.json(quakeUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // A function to determine the marker size based on the magnitude of the earthquake.
  function markerSize(magnitude) {
    return Math.sqrt(magnitude) * 5; 
  }

  // A function to determine marker color based on depth.
  function markerColor(depth) {
    return depth > 90 ? '#ff5e6e' :
           depth > 70 ? '#fca35d' :
           depth > 50 ? '#fdb72a' :
           depth > 30 ? '#f7db11' :
           depth > 10 ? '#dcf400' :
                        '#a3f600';
  }

    // A function to define the circle markers for each earthquake
  // Create a circle marker with size proportional to magnitude and color based on depth.
  function pointToLayer(feature, latlng) {    
    return L.circleMarker(latlng, {
      radius: markerSize(feature.properties.mag),
      fillColor: markerColor(feature.geometry.coordinates[2]),
      color: '#000',
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    });
  }
  // Bind a popup to each marker to display earthquake details.
  function onEachFeature(feature, layer){
    layer.bindPopup(`
      <h3>${feature.properties.place}</h3>
      <hr>
      <p><strong>Magnitude:</strong> ${feature.properties.mag}</p>
      <p><strong>Depth:</strong> ${feature.geometry.coordinates[2]} km</p>
      <p>${new Date(feature.properties.time)}</p>
    `);
  }

  // Create a GeoJSON layer 
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
  });

// Fetch tectonic plates data and add it as a layer.
let platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

d3.json(platesUrl).then(function (plateData) {
  // Create a GeoJSON layer for tectonic plates.
  let tectonicPlates = L.geoJSON(plateData, {
    
    style: {
      color: "orange",
      weight: 2,
      opacity: 0.8,     
      fill:false   //to remove the yellow hue over the tectonic bounding box 
    }
  });

  // Send the earthquakes layer to the createMap function.
  createMap(earthquakes, tectonicPlates);
});
}

function createMap(earthquakes, tectonicPlates) {
  // Create the base layers.
  let satellite = L.tileLayer('https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    subdomains: ['server', 'services'],
    maxZoom: 19
  })
  
  let grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
})

  let outdoors = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
  maxZoom: 20
});




  // Create a baseMaps object.
  let baseMaps = {
    "Satellite ": satellite,
    "Grayscale ": grayscale,
    "Outdoors ": outdoors
  };

  // Create an overlay object to hold our overlay layer.
  let overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
  };

  // Create the map with default layers.
  let myMap = L.map("map", {
    center: [37.09, -95.71], // Centered on the USA
    zoom: 3,
    layers: [satellite, earthquakes,tectonicPlates ]
  });

  // Add layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// Add a legend to the map
let legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b>Depth (km)</b><br>';
    div.innerHTML += '<i style="background: #a3f600"></i>-10-10<br>';
    div.innerHTML += '<i style="background: #dcf400"></i> 10-30<br>';
    div.innerHTML += '<i style="background: #f7db11"></i> 30-50<br>';
    div.innerHTML += '<i style="background: #fdb72a"></i> 50-70<br>';
    div.innerHTML += '<i style="background: #fca35d"></i> 70-90<br>';
    div.innerHTML += '<i style="background: #ff5e6e"></i> 90+<br>';
    return div;
};

legend.addTo(myMap);
 

