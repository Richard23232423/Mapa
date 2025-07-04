// Lista de edificios con nombres y coordenadas
let edificios_sugerido = [
    { nombre: 'Biblioteca Central', coordenadas: [31.86475834107883, -116.66720322419738] },
    { nombre: 'Laboratorios Electronica', coordenadas: [31.86469505956888, -116.6657790096741] },
    { nombre: 'Vicerrectoria', coordenadas: [31.86428346067026, -116.66642049329816] },
    { nombre: 'Enfermeria UABC ', coordenadas: [31.863741621742474, -116.66679264852777] },
    { nombre: 'Direccion FIAD', coordenadas: [31.86476672279178, -116.66655371764318] },
    { nombre: 'Cancha UABC', coordenadas: [31.864102848052326, -116.6657951712459] },
    { nombre: 'Cancha Futbol Rapido ', coordenadas: [31.86387493161803, -116.66630656822798] },
    { nombre: 'Cancha Basquebol ', coordenadas: [31.86388783256294, -116.66655720338252] },
    { nombre: 'Gimancio FIAD ', coordenadas: [31.863711519487115, -116.66709391704688] },
    { nombre: 'Cafeteria ', coordenadas: [31.86358035954546, -116.66673695182675] },
    { nombre: 'Boletos UABC ', coordenadas: [31.863741621742474, -116.66679264852777] },
    { nombre: 'Banco Deportivo ', coordenadas: [31.863459950249123, -116.66696986530332] },

    //Edificios
    { nombre: 'Edificio 40 DIB', coordenadas: [31.865582170593314, -116.66646916729505] },
    { nombre: 'Edificio 40', coordenadas: [31.865582170593314, -116.66646916729505] },

    { nombre: 'Edificio 55', coordenadas: [31.86505485957527, -116.66635593364391] },
    { nombre: 'Edificio  E 55', coordenadas: [31.86505485957527, -116.66635593364391] },
    { nombre: 'E 55', coordenadas: [31.86505485957527, -116.66635593364391] },

    { nombre: 'Edificio 45', coordenadas: [31.86498796219293, -116.66579604064] },

    { nombre: 'Edificio 36', coordenadas: [31.864816198421334, -116.66605576286995] },
    { nombre: 'Edificio 34', coordenadas: [31.864561264226893, -116.66625374785396] },
    { nombre: 'Edificio E 35', coordenadas: [31.864696697678685, -116.66575563088979] },

    { nombre: 'Edificio 31', coordenadas: [31.86428346067026, -116.66642049329816] },

    { nombre: 'Edificio E 1', coordenadas: [31.865896057668653, -116.66834202945842] },
    { nombre: 'Edificio E 37', coordenadas: [31.865011995340993, -116.66679301766534] },



    { nombre: 'Edificio 55 102', coordenadas: [31.86498302981054, -116.66635301727513] },
    { nombre: 'Edificio 55 103', coordenadas: [31.864977611817718, -116.66646146714395] },
    { nombre: 'Edificio 55 104', coordenadas: [31.86510425731609, -116.66647023882453] },
    { nombre: 'Edificio 55 105', coordenadas: [31.86508664886149, -116.66633308163745] },
    { nombre: 'Edificio 55 Sanitarios', coordenadas: [31.865092744096145, -116.66626051591642] },



];


const searchContainer = document.querySelector('.search-input-box');
const inputSearch = searchContainer.querySelector('input');
const boxSuggestions = document.querySelector('.container-suggestions');

let currentMarker = null;

inputSearch.onkeyup = e => {
    let userData = e.target.value.toLowerCase();
    let emptyArray = [];

    if (userData) {
        emptyArray = edificios_sugerido.filter(edificio => {
            return edificio.nombre.toLowerCase().startsWith(userData);
        });

        emptyArray = emptyArray.map(edificio => {
            return `<li>${edificio.nombre}</li>`;
        });

        searchContainer.classList.add('active');
        showSuggestions(emptyArray);

        let allList = boxSuggestions.querySelectorAll('li');
        allList.forEach((li, index) => {
            li.setAttribute('onclick', 'selectBuilding(this)');
            li.addEventListener('mouseover', () => currentIndex = index); // Resaltar al pasar el ratón
            li.addEventListener('mouseleave', () => currentIndex = -1); // Resetear al salir
        });

        updateSuggestionsHighlight(allList); // Resaltar las sugerencias
    } else {
        searchContainer.classList.remove('active');
    }
};

const showSuggestions = list => {
    let listData;

    if (!list.length) {
        listData = `<li>No hay resultados</li>`;
    } else {
        listData = list.join('');
    }

    boxSuggestions.innerHTML = listData;
};




const searchButton = searchContainer.querySelector('.search-button');
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    performSearch();
});

function performSearch() {
    const selectUserData = inputSearch.value.trim();
    const selectedEdificio = edificios_sugerido.find(edificio => edificio.nombre.toLowerCase() === selectUserData.toLowerCase());
    var SelectedEdificioInfo = edificios.find(edificio => edificio.nombre === selectUserData);

    if (selectedEdificio) {
        map.setView(selectedEdificio.coordenadas, 21);
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }

        currentMarker = L.marker(selectedEdificio.coordenadas).addTo(map)
            .bindPopup(selectedEdificio.nombre)
            .openPopup();

        searchContainer.classList.remove('active');
        mostrarPanelEdificio(SelectedEdificioInfo);

        inputSearch.value = '';
    } else {
        alert("Edificio no encontrado.");
    }
}


let currentIndex = -1;


inputSearch.addEventListener('keydown', function (e) {
    const suggestions = boxSuggestions.querySelectorAll('li');

    if (e.key === 'ArrowDown') {
        currentIndex++;
        if (currentIndex >= suggestions.length) {
            currentIndex = suggestions.length - 1;
        }
        updateSuggestionsHighlight(suggestions);
    } else if (e.key === 'ArrowUp') {
        currentIndex--;
        if (currentIndex < -1) {
            currentIndex = -1;
        }
        updateSuggestionsHighlight(suggestions);
    } else if (e.key === 'Enter') {
        if (currentIndex > -1 && currentIndex < suggestions.length) {
            const selectedSuggestion = suggestions[currentIndex].textContent;
            inputSearch.value = selectedSuggestion;
            performSearch();
        } else {
            performSearch();
        }
    }
});

function updateSuggestionsHighlight(suggestions) {
    suggestions.forEach((suggestion, index) => {
        suggestion.classList.remove('highlight');
        if (index === currentIndex) {
            suggestion.classList.add('highlight');
        }
    });
}


document.addEventListener('click', function (event) {
    if (!searchContainer.contains(event.target)) {
        searchContainer.classList.remove('active');
    }
});

function selectBuilding(element) {
    let selectUserData = element.textContent;
    inputSearch.value = selectUserData;

    searchContainer.classList.remove('active');

    const selectedEdificio = edificios_sugerido.find(edificio => edificio.nombre === selectUserData);

    if (selectedEdificio) {
        map.setView(selectedEdificio.coordenadas, 21);
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }
        currentMarker = L.marker(selectedEdificio.coordenadas).addTo(map)
            .bindPopup(selectedEdificio.nombre)
            .openPopup();
    }
}

