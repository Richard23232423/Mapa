// Cargar el mapa en coordenadas
var map = L.map('map', {
    center: [31.86507019358021, -116.6675618186344],
    zoom: 19,
    maxZoom: 70,
    minZoom: 10,
    zoomControl: false 
});

// Agregar el control de escala en la parte superior izquierda
L.control.scale({
    position: 'bottomleft',  // Puedes cambiar a 'bottomleft', 'bottomright', 'topright'
    imperial: true,      // Si no quieres unidades imperiales (millas), pon false
    metric: true          // Para mostrar la escala en kilómetros y metros
}).addTo(map);

// Cargar Capas
var Satelite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 22,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//https://tile.openstreetmap.org/{z}/{x}/{y}.png
//https://tile.openstreetmap.de/{z}/{x}/{y}.png
//https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png
//https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png
//https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png

var Atlas = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>',
    subdomains: 'abc',
    maxZoom: 22
}).addTo(map);

// FUNCION PARA CAMBIAR CAPA
var mapa_anterior = Atlas;
function cambio_capa() {
    if (mapa_anterior == Atlas) {
        map.removeLayer(Atlas);
        Satelite.addTo(map);
        mapa_anterior = Satelite;
        map.setMaxZoom(19); 

    } else {
        map.removeLayer(Satelite);
        Atlas.addTo(map);
        mapa_anterior = Atlas;
        map.setMaxZoom(22); 
    }
}
document.getElementById('btn_capas').addEventListener('click', cambio_capa);

// FUNCION PARA HACER ZOOM
function zoomIn() {
    map.zoomIn();
}
function zoomOut() {
    map.zoomOut();
}
document.getElementById('btn_zoom_mas').addEventListener('click', zoomIn);
document.getElementById('btn_zoom_menos').addEventListener('click', zoomOut);


// FUNCION PARA CENTRAR EL MAPA
function reset_vista() {
    map.setView([31.86507019358021, -116.6675618186344], 19.4);
}
document.getElementById('btn_centrar').addEventListener('click', reset_vista);

// variable global para en endpoint, para borrar los marcadores anteriores
let endMarker = null;

// FUNCIONALIDAD DE LOS EDIFICIOS
edificios.forEach(function (edificio) { 
    var polygon = L.polygon(edificio.coords, {
        color: 'green',
        fillColor: '#D7F2F7',
        fillOpacity: 0.2,
        weight: 1
    }).addTo(map);

    polygon.on('click', function () {
        // Llamar a la función en panel.js para mostrar el panel del edificio
        mostrarPanelEdificio(edificio);
    });

    polygon.on('mouseover', function () {
        polygon.setStyle({
            color: 'black',
            weight: 4
        });
    });

    polygon.on('mouseout', function () {
        polygon.setStyle({
            color: 'green',
            weight: 1
        });
    });
});
