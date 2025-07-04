const mapboxToken = 'pk.eyJ1IjoicmljaGFyZDIzNzQ4IiwiYSI6ImNtMGx6OG1pNzBjbjEyaXB5Mmh2cnR1YzUifQ.Gwhs61FvozyFyldP_190CA';
let startPoint = null;
let endPoint = null;


// Función para obtener ubicación
function obtenerUbicacion(opciones = {}) {
    if (!navigator.geolocation) {
        console.error("Geolocalización no soportada");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            startPoint = [latitude, longitude];
            
            // Elimina marcador anterior si existe
            if (window.userMarker) map.removeLayer(window.userMarker);
            
            window.userMarker = L.marker(startPoint)
                .addTo(map)
                .bindPopup("Estás aquí")
                .openPopup();
            
            updateRoute();
        },
        (error) => {
            if (error.code === error.PERMISSION_DENIED && opciones.mostrarAlerta) {
                alert("Activa los permisos de ubicación para usar esta función.");
            }
            console.error("Error:", error);
        },
        { 
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            ...opciones 
        }
    );
}

// Al cargar la página 
document.addEventListener('DOMContentLoaded', () => {
    obtenerUbicacion(); 
});

// Al hacer clic en el botón GPS
document.getElementById('btn_gps').addEventListener('click', () => {
    obtenerUbicacion({ mostrarAlerta: true });
});


//crea la ruta
const routingControl = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim(),
    router: L.Routing.mapbox(mapboxToken, {
        language: 'es',
        profile: 'mapbox/walking',
        urlParameters: {
            alternatives: false
        }
    }),
    show: false
}).addTo(map);

//actualiza la ruta
function updateRoute() {
    if (startPoint && endPoint) {
        routingControl.setWaypoints([
            L.latLng(startPoint),
            L.latLng(endPoint)
        ]);
    }
}

