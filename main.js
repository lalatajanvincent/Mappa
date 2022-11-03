import '/style.css'

var map = L.map('map').setView([0, 0], 2);

var tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var yellowGroup = L.layerGroup([]).addTo(map)
var orangeGroup = L.layerGroup([]).addTo(map)
var redGroup = L.layerGroup([]).addTo(map)

var layerControl = L.control.layers(null, {"M1.0-":yellowGroup, "1.0+ &lt M &lt 2.5-":orangeGroup, "M2.5+":redGroup}).addTo(map);

// <1
var yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
// <2,5
var orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
// >2,5
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
  .then((response) => response.json())
  .then((data) => data.features.forEach((feature)=>{
    var icon
    var group
    if (feature.properties.mag<1){
      icon = yellowIcon
      group = yellowGroup
    }else if(feature.properties.mag<2.5){
      icon = orangeIcon
      group = orangeGroup
    }else{
      icon = redIcon
      group = redGroup
    }
    var marker = L.marker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {icon:icon}).addTo(group)
    marker.bindPopup(`Magnitude: ${feature.properties.mag}, ${feature.properties.place}<br><a href="${feature.properties.url}">More info</a>`)
  }));
