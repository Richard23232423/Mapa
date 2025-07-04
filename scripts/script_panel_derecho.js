var panel_informacion = document.getElementById('panel_informacion');
var cerrarpanel = document.getElementById('cerrar-panel');
cerrarpanel.addEventListener('click', function () {
    panel_informacion.style.display = 'none';
});

var infoTab = document.getElementById('infoTab');
var interiorTab = document.getElementById('interiorTab');
var salonesTab = document.getElementById('salonesTab');
var infoContent = document.getElementById('infoContent');
var interiorContent = document.getElementById('interiorContent');
var salonesContent = document.getElementById('salonesContent');

function openTab(tabName) {
    infoContent.style.display = 'none';
    interiorContent.style.display = 'none';
    salonesContent.style.display = 'none';

    infoTab.classList.remove('active');
    interiorTab.classList.remove('active');
    salonesTab.classList.remove('active');

    if (tabName === 'info') {
        infoContent.style.display = 'block';
        infoTab.classList.add('active');
    } else if (tabName === 'interior') {
        interiorContent.style.display = 'block';
        interiorTab.classList.add('active');
    } else if (tabName === 'salones') {
        salonesContent.style.display = 'block';
        salonesTab.classList.add('active');
    }
}

infoTab.addEventListener('click', function () { openTab('info'); });
interiorTab.addEventListener('click', function () { openTab('interior'); });
salonesTab.addEventListener('click', function () { openTab('salones'); });
openTab('info');

function mostrarSalones(edificio) {
    var salonesList = document.getElementById('salonesContent').getElementsByTagName('ul')[0];
    salonesList.innerHTML = ''; // Limpiar lista 

    if (edificio.salones && edificio.salones.length > 0) {
        edificio.salones.forEach(function (salon) {
            var li = document.createElement('li');
            li.textContent = salon;
            salonesList.appendChild(li);
        });
    }
    else {
        var li = document.createElement('li');
        li.textContent = "No hay salones disponibles.";
        salonesList.appendChild(li);
    }
}


function mostrarPanelEdificio(edificio) {
    mostrarSalones(edificio);
    document.getElementById('edificioImagen').src = edificio.imagen;
    document.getElementById('interiorImagen').src = edificio.imagen2;
    document.getElementById('edificioImagen').alt = edificio.nombre;
    document.getElementById('edificioNombre').innerText = edificio.nombre;
    document.getElementById('edificioInfo').innerText = edificio.info;
    panel_informacion.style.display = 'block';
    cargarBotonesPisos(edificio);

    document.getElementById('btn_direcciones').onclick = function () {
        if (edificio) {
            endPoint = edificio.labelCoords || edificio.coords[0];
            if (endMarker) {
                map.removeLayer(endMarker);
            }
            endMarker = L.marker(endPoint, { draggable: true }).addTo(map);
            endMarker.on('dragend', () => {
                endPoint = endMarker.getLatLng();
                updateRoute();
            });
            updateRoute();
            panel_informacion.style.display = 'none';
        }
    };
}

function cargarBotonesPisos(edificio) {
    var container = document.getElementById('floorButtonsContainer');
    container.innerHTML = '';

    if (edificio.pisos && edificio.pisos > 0) {
        var imagenesPisos = [];
        if (edificio.imagen2) imagenesPisos.push(edificio.imagen2);
        if (edificio.imagen3) imagenesPisos.push(edificio.imagen3);
        if (edificio.imagen4) imagenesPisos.push(edificio.imagen4);

        for (var i = 0; i < edificio.pisos; i++) {
            var boton = document.createElement('button');
            boton.textContent = (i + 1); // Numerar los pisos
            boton.classList.add('floor-button');

            boton.addEventListener('click', function (imagen) {
                return function () {
                    document.getElementById('interiorImagen').src = imagen;
                };
            }(imagenesPisos[i] || edificio.imagen));

            container.appendChild(boton);
        }
    }
}

