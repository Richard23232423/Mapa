document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-responsive');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});

// Elementos del DOM
const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions');

// Mostrar las sugerencias a medida que el usuario escribe
searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    
    // Filtrar los edificios que coincidan con el texto ingresado
    const suggestions = edificios_sugerido.filter(edificio => edificio.nombre.toLowerCase().includes(query));
    
    // Ordenar las sugerencias, dando prioridad a las que comienzan con el texto ingresado
    suggestions.sort((a, b) => {
        const indexA = a.nombre.toLowerCase().indexOf(query);
        const indexB = b.nombre.toLowerCase().indexOf(query);
        
        return indexA - indexB;
    });
    
    // Limpiar las sugerencias previas
    suggestionsList.innerHTML = '';
    
    // Mostrar las nuevas sugerencias
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion.nombre;
        li.addEventListener('click', function() {
            selectBuilding(suggestion);
        });
        suggestionsList.appendChild(li);
    });
});

// Ocultar las sugerencias cuando se hace clic fuera del campo de búsqueda
document.addEventListener('click', function(event) {
    const searchBar = document.querySelector('.search-bar');
    
    if (!searchBar.contains(event.target)) {
        suggestionsList.innerHTML = '';
    }
});
