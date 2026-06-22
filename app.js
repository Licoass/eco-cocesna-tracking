import "./firebase.js";

// Initial dataset of 70 cabinets from the Cocesna quotation (CTV-141)
// Ordered exactly as they appear in the document, grouped by Sede principal
const INITIAL_CABINETS = [
    // 1. Mata Cañas (Cant: 2, 60.000 BTU)
    { id: "mc-1", sede: "Mata Cañas", area: "Mata Cañas", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "mc-2", sede: "Mata Cañas", area: "Mata Cañas", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 2. Tres Amigos (Cant: 1, 12.000 BTU)
    { id: "ta-1", sede: "Tres Amigos", area: "Tres Amigos", capacidad: "12.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 3. Cerro Brujo (Cant: 2, 18.000 BTU)
    { id: "cb-1", sede: "Cerro Brujo", area: "Cerro Brujo", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "cb-2", sede: "Cerro Brujo", area: "Cerro Brujo", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 4. Daniel Oduber - Dvor Liberia (Cant: 4, No especificado)
    { id: "do-lib-1", sede: "Daniel Oduber", area: "Dvor Liberia", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-lib-2", sede: "Daniel Oduber", area: "Dvor Liberia", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-lib-3", sede: "Daniel Oduber", area: "Dvor Liberia", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-lib-4", sede: "Daniel Oduber", area: "Dvor Liberia", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 5. Localizador ILS IGUA (Cant: 2, 2 x 24.000 BTU)
    { id: "do-loc-1", sede: "Daniel Oduber", area: "Localizador ILS IGUA", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-loc-2", sede: "Daniel Oduber", area: "Localizador ILS IGUA", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 6. Glide Slope ILS IGUA (Cant: 2, 2 x 12.000 BTU)
    { id: "do-gs-1", sede: "Daniel Oduber", area: "Glide Slope ILS IGUA", capacidad: "12.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-gs-2", sede: "Daniel Oduber", area: "Glide Slope ILS IGUA", capacidad: "12.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 7. Oficinas de personal técnico turno Liberia (Shelter) (Cant: 2, 2 x 18.000 BTU)
    { id: "do-she-1", sede: "Daniel Oduber", area: "Oficinas de personal técnico turno Liberia (Shelter)", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-she-2", sede: "Daniel Oduber", area: "Oficinas de personal técnico turno Liberia (Shelter)", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 8. Torre de Control LIB (Cant: 4, 1 x 18.000 BTU, 1 x 24.000 BTU, 2 x 36.000 BTU)
    { id: "do-tor-1", sede: "Daniel Oduber", area: "Torre de Control LIB", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-tor-2", sede: "Daniel Oduber", area: "Torre de Control LIB", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-tor-3", sede: "Daniel Oduber", area: "Torre de Control LIB", capacidad: "36.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-tor-4", sede: "Daniel Oduber", area: "Torre de Control LIB", capacidad: "36.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 9. Faro #1 bor viejo (01) (Cant: 2, 2 x 24.000 BTU)
    { id: "do-far-1", sede: "Daniel Oduber", area: "Faro #1 bor viejo (01)", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "do-far-2", sede: "Daniel Oduber", area: "Faro #1 bor viejo (01)", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 10. Limón (Cant: 2, 2 x 24.000 BTU)
    { id: "li-1", sede: "Limón", area: "Limón", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "li-2", sede: "Limón", area: "Limón", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 11. Volcán Poás (Cant: 3, No especificado)
    { id: "vp-1", sede: "Volcán Poás", area: "Volcán Poás", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "vp-2", sede: "Volcán Poás", area: "Volcán Poás", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "vp-3", sede: "Volcán Poás", area: "Volcán Poás", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 12. Juan Santamaría - Dvor TIO (Cant: 3, 2 x 18.000 BTU, 1 x 24.000 BTU)
    { id: "js-dvor-1", sede: "Juan Santamaría", area: "Dvor TIO", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-dvor-2", sede: "Juan Santamaría", area: "Dvor TIO", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-dvor-3", sede: "Juan Santamaría", area: "Dvor TIO", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 13. Localizador ILS IOCO (Cant: 2, 2 x 12.000 BTU)
    { id: "js-loc-1", sede: "Juan Santamaría", area: "Localizador ILS IOCO", capacidad: "12.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-loc-2", sede: "Juan Santamaría", area: "Localizador ILS IOCO", capacidad: "12.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 14. Glide Slope ILS IOCO (Cant: 2, 2 x 12.000 BTU)
    { id: "js-gs-1", sede: "Juan Santamaría", area: "Glide Slope ILS IOCO", capacidad: "12.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-gs-2", sede: "Juan Santamaría", area: "Glide Slope ILS IOCO", capacidad: "12.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 15. Oficina personal técnico turno Juan Santamaría (antigua AFTN) (Cant: 1, No especificado)
    { id: "js-aftn-1", sede: "Juan Santamaría", area: "Oficina personal técnico turno Juan Santamaria (antigua AFTN)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 16. Torre de Control OCO (Cant: 2, 2 x 36.000 BTU)
    { id: "js-tor-1", sede: "Juan Santamaría", area: "Torre de Control OCO", capacidad: "36.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-tor-2", sede: "Juan Santamaría", area: "Torre de Control OCO", capacidad: "36.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 17. Río Segundo - Edificio Regional (Cant: 15, 1x12k, 3x18k, 6x24k, 2x36k, 3x60k)
    { id: "rs-ed-1", sede: "Río Segundo", area: "Edificio Regional", capacidad: "12.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-2", sede: "Río Segundo", area: "Edificio Regional", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-3", sede: "Río Segundo", area: "Edificio Regional", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-4", sede: "Río Segundo", area: "Edificio Regional", capacidad: "18.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-5", sede: "Río Segundo", area: "Edificio Regional", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-6", sede: "Río Segundo", area: "Edificio Regional", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-7", sede: "Río Segundo", area: "Edificio Regional", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-8", sede: "Río Segundo", area: "Edificio Regional", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-9", sede: "Río Segundo", area: "Edificio Regional", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-10", sede: "Río Segundo", area: "Edificio Regional", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-11", sede: "Río Segundo", area: "Edificio Regional", capacidad: "36.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-12", sede: "Río Segundo", area: "Edificio Regional", capacidad: "36.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-13", sede: "Río Segundo", area: "Edificio Regional", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-14", sede: "Río Segundo", area: "Edificio Regional", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "rs-ed-15", sede: "Río Segundo", area: "Edificio Regional", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 18. Cabecera Radar OCO y sótano (Cant: 6, 1x24k, 5x60k)
    { id: "js-rad-1", sede: "Juan Santamaría", area: "Cabecera Radar OCO y sótano", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-rad-2", sede: "Juan Santamaría", area: "Cabecera Radar OCO y sótano", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-rad-3", sede: "Juan Santamaría", area: "Cabecera Radar OCO y sótano", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-rad-4", sede: "Juan Santamaría", area: "Cabecera Radar OCO y sótano", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-rad-5", sede: "Juan Santamaría", area: "Cabecera Radar OCO y sótano", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-rad-6", sede: "Juan Santamaría", area: "Cabecera Radar OCO y sótano", capacidad: "60.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 19. Centro de Control OCO y FIC (ATC - OCO) (Cant: 10, No especificado)
    { id: "js-cc-1", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-cc-2", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-cc-3", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-cc-4", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-cc-5", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-cc-6", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-cc-7", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-cc-8", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-cc-9", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "js-cc-10", sede: "Juan Santamaría", area: "Centro de Control OCO y FIC (ATC - OCO)", capacidad: "No especificado", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 20. Sala FIC (Cant: 1, 24.000 BTU)
    { id: "js-fic-1", sede: "Juan Santamaría", area: "Sala FIC", capacidad: "24.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    
    // 21. Tobias Bolaños - Torre de Control PVS (Cant: 2, 2 x 36.000 BTU)
    { id: "tb-1", sede: "Tobías Bolaños", area: "Torre de Control PVS", capacidad: "36.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" },
    { id: "tb-2", sede: "Tobías Bolaños", area: "Torre de Control PVS", capacidad: "36.000 BTU", gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico", instalado: false, reporteUrl: "" }
];

// Application State
let cabinets = [];
let pendingDialogAction = null;

// DOM Elements
const trackingTable = document.getElementById("tracking-table");
const tableBody = document.getElementById("table-body");
const noResults = document.getElementById("no-results");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search-btn");
const filterSede = document.getElementById("filter-sede");
const filterCapacidad = document.getElementById("filter-capacidad");
const filterEstado = document.getElementById("filter-estado");
const resetFiltersBtn = document.getElementById("reset-filters-btn");

// KPI Elements
const progressCircle = document.getElementById("progress-circle");
const progressPercentage = document.getElementById("progress-percentage");
const installedFraction = document.getElementById("installed-fraction");
const installedCountEl = document.getElementById("installed-count");
const pendingCountEl = document.getElementById("pending-count");
const sedeBreakdownEl = document.getElementById("sede-breakdown");

// Modal Dialog Elements
const confirmDialog = document.getElementById("confirm-dialog");
const confirmTitle = document.getElementById("confirm-title");
const confirmMessage = document.getElementById("confirm-message");
const confirmCancel = document.getElementById("confirm-cancel");
const confirmOk = document.getElementById("confirm-ok");

// Action Buttons
const addRowBtn = document.getElementById("add-row-btn");
const exportCsvBtn = document.getElementById("export-csv-btn");
const backupJsonBtn = document.getElementById("backup-json-btn");
const restoreJsonBtn = document.getElementById("restore-json-btn");
const importFileInput = document.getElementById("import-file-input");
const resetDbBtn = document.getElementById("reset-db-btn");
const themeToggle = document.getElementById("theme-toggle");

// Initialize Application
document.addEventListener("DOMContentLoaded", async () => {
    await loadDatabase();
    setupEventListeners();
    updateThemeIcon();
    renderApp();
});

// Load data from Firestore or initialize with default values
async function loadDatabase() {
    try {
        let data = await window.loadFirestoreData();
        if (!data || data.length === 0) {
            console.log("Firestore está vacío, inicializando con los registros de la cotización original...");
            // Save initial cabinets to Firestore, including an 'order' field to preserve order
            for (let i = 0; i < INITIAL_CABINETS.length; i++) {
                const cabinet = { ...INITIAL_CABINETS[i], order: i };
                await window.createCabinet(cabinet);
            }
            data = await window.loadFirestoreData();
        }
        cabinets = data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } catch (e) {
        console.error("Error cargando datos de Firestore:", e);
        showToast("Error al cargar datos desde Firestore. Usando datos locales.", "error");
        // Fallback to localStorage
        const stored = localStorage.getItem("eco_ingenieria_cabinets_db");
        if (stored) {
            try {
                cabinets = JSON.parse(stored);
            } catch (err) {
                cabinets = JSON.parse(JSON.stringify(INITIAL_CABINETS));
            }
        } else {
            cabinets = JSON.parse(JSON.stringify(INITIAL_CABINETS));
        }
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Search & Filters
    searchInput.addEventListener("input", () => {
        clearSearchBtn.style.display = searchInput.value ? "flex" : "none";
        renderTable();
    });
    
    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearSearchBtn.style.display = "none";
        renderTable();
    });
    
    filterSede.addEventListener("change", renderTable);
    filterCapacidad.addEventListener("change", renderTable);
    filterEstado.addEventListener("change", renderTable);
    
    resetFiltersBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearSearchBtn.style.display = "none";
        filterSede.value = "all";
        filterCapacidad.value = "all";
        filterEstado.value = "all";
        renderTable();
        showToast("Filtros restablecidos", "success");
    });

    // Theme Toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("eco_theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
        updateThemeIcon();
    });
    
    // Check local storage for theme preference
    if (localStorage.getItem("eco_theme") === "dark") {
        document.body.classList.add("dark-theme");
        updateThemeIcon();
    }

    // Row Actions
    addRowBtn.addEventListener("click", addNewRow);
    exportCsvBtn.addEventListener("click", exportToCSV);
    
    backupJsonBtn.addEventListener("click", backupJSON);
    restoreJsonBtn.addEventListener("click", () => importFileInput.click());
    importFileInput.addEventListener("change", importJSON);
    
    resetDbBtn.addEventListener("click", () => {
        showConfirmModal(
            "Restablecer Cotización",
            "¿Estás seguro de que deseas restablecer todos los registros al estado original de la cotización? Se perderán todos los avances y links registrados.",
            async () => {
                showToast("Restableciendo base de datos...", "info");
                try {
                    // Delete all existing documents in Firestore cabinets collection
                    for (const cab of cabinets) {
                        await window.deleteCabinet(cab.id);
                    }
                    // Re-initialize with original quotation cabinets
                    for (let i = 0; i < INITIAL_CABINETS.length; i++) {
                        const cabinet = { ...INITIAL_CABINETS[i], order: i };
                        await window.createCabinet(cabinet);
                    }
                    cabinets = JSON.parse(JSON.stringify(INITIAL_CABINETS));
                    cabinets.forEach((cab, idx) => cab.order = idx);
                    populateSedeDropdown();
                    renderApp();
                    showToast("Datos restablecidos al estado original de la cotización", "success");
                } catch (err) {
                    console.error("Error al restablecer base de datos:", err);
                    showToast("Error al restablecer la base de datos en Firestore", "error");
                }
            }
        );
    });

    // Dialog Modal Close
    confirmCancel.addEventListener("click", hideConfirmModal);
    confirmOk.addEventListener("click", () => {
        if (pendingDialogAction) {
            pendingDialogAction();
        }
        hideConfirmModal();
    });
    
    // Close modal clicking outside card
    confirmDialog.addEventListener("click", (e) => {
        if (e.target === confirmDialog) {
            hideConfirmModal();
        }
    });
}

function updateThemeIcon() {
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.querySelector("span").textContent = isDark ? "light_mode" : "dark_mode";
}

// Rerender all components (Table, Counters, Leaderboard, Dropdowns)
function renderApp() {
    populateSedeDropdown();
    renderTable();
    updateKPIs();
}

// Dynamically populate Sede filters based on current data
function populateSedeDropdown() {
    const previousSelection = filterSede.value;
    
    // Find unique Sedes
    const uniqueSedes = [...new Set(cabinets.map(c => c.sede).filter(Boolean))].sort();
    
    // Clear and refill select options
    filterSede.innerHTML = '<option value="all">Todas las Sedes</option>';
    uniqueSedes.forEach(sede => {
        const option = document.createElement("option");
        option.value = sede;
        option.textContent = sede;
        filterSede.appendChild(option);
    });
    
    // Restore selection if it still exists
    if (uniqueSedes.includes(previousSelection)) {
        filterSede.value = previousSelection;
    } else {
        filterSede.value = "all";
    }
}

// Render Table Rows based on filters
function renderTable() {
    tableBody.innerHTML = "";
    
    const query = searchInput.value.toLowerCase().trim();
    const selectedSede = filterSede.value;
    const selectedCap = filterCapacidad.value;
    const selectedEst = filterEstado.value;
    
    const filtered = cabinets.filter(c => {
        // Search filter
        const matchSearch = !query || 
            (c.sede && c.sede.toLowerCase().includes(query)) ||
            (c.area && c.area.toLowerCase().includes(query)) ||
            (c.capacidad && c.capacidad.toLowerCase().includes(query)) ||
            (c.gabinete && c.gabinete.toLowerCase().includes(query));
            
        // Sede filter
        const matchSede = selectedSede === "all" || c.sede === selectedSede;
        
        // Capacity filter
        const matchCap = selectedCap === "all" || c.capacidad === selectedCap;
        
        // Status filter
        const matchEst = selectedEst === "all" || 
            (selectedEst === "instalado" && c.instalado) ||
            (selectedEst === "pendiente" && !c.instalado);
            
        return matchSearch && matchSede && matchCap && matchEst;
    });

    if (filtered.length === 0) {
        noResults.style.display = "flex";
        trackingTable.querySelector("thead").style.display = window.innerWidth > 980 ? "table-header-group" : "none";
        if (window.innerWidth <= 980) {
            trackingTable.style.display = "none";
        }
        return;
    } else {
        noResults.style.display = "none";
        trackingTable.style.display = "table";
        if (window.innerWidth > 980) {
            trackingTable.querySelector("thead").style.display = "table-header-group";
        } else {
            trackingTable.querySelector("thead").style.display = "none";
        }
    }

    filtered.forEach(c => {
        const row = document.createElement("tr");
        if (c.instalado) {
            row.classList.add("row-installed");
        }
        row.setAttribute("data-id", c.id);

        // Responsive labels for mobile view (data-label matches CSS content)
        row.innerHTML = `
            <td class="col-sede-cell" data-label="Sede">
                <input type="text" class="cell-input val-sede" value="${c.sede || 'No especificado'}" placeholder="Sede">
            </td>
            <td class="col-area-cell" data-label="Área">
                <input type="text" class="cell-input val-area" value="${c.area || 'No especificado'}" placeholder="Área">
            </td>
            <td class="col-capacidad-cell" data-label="Capacidad del Equipo">
                <div class="cell-select-wrapper">
                    <select class="cell-select val-capacidad">
                        <option value="12.000 BTU" ${c.capacidad === '12.000 BTU' ? 'selected' : ''}>12.000 BTU</option>
                        <option value="18.000 BTU" ${c.capacidad === '18.000 BTU' ? 'selected' : ''}>18.000 BTU</option>
                        <option value="24.000 BTU" ${c.capacidad === '24.000 BTU' ? 'selected' : ''}>24.000 BTU</option>
                        <option value="36.000 BTU" ${c.capacidad === '36.000 BTU' ? 'selected' : ''}>36.000 BTU</option>
                        <option value="60.000 BTU" ${c.capacidad === '60.000 BTU' ? 'selected' : ''}>60.000 BTU</option>
                        <option value="No especificado" ${c.capacidad === 'No especificado' ? 'selected' : ''}>No especificado</option>
                    </select>
                </div>
            </td>
            <td class="col-gabinete-cell" data-label="Gabinete de Protección Eléctrica">
                <input type="text" class="cell-input val-gabinete" value="${c.gabinete || 'Suministro e Instalación de Gabinete'}" placeholder="Gabinete de Protección">
            </td>
            <td class="col-instalado-cell" data-label="Instalado">
                <label class="switch">
                    <input type="checkbox" class="val-instalado" ${c.instalado ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </td>
            <td class="col-reporte-cell" data-label="Link de Reporte">
                <div class="report-link-cell">
                    <input type="url" class="cell-input val-reporte" value="${c.reporteUrl || ''}" placeholder="Pegar URL del reporte...">
                    <a href="${c.reporteUrl || '#'}" target="_blank" class="report-link-btn ${c.reporteUrl ? '' : 'disabled'}" title="Abrir reporte en pestaña nueva">
                        <span class="material-symbols-rounded" style="font-size: 18px;">open_in_new</span>
                    </a>
                </div>
            </td>
            <td class="col-actions-cell" data-label="Acciones">
                <div class="actions-cell">
                    <button class="icon-btn-small duplicate-row-btn" title="Duplicar registro">
                        <span class="material-symbols-rounded" style="font-size:18px;">content_copy</span>
                    </button>
                    <button class="icon-btn-small delete-row-btn" title="Eliminar registro">
                        <span class="material-symbols-rounded" style="font-size:18px; color: var(--error);">delete</span>
                    </button>
                </div>
            </td>
        `;

        // Add Change listeners to inputs for auto-saving
        const inputSede = row.querySelector(".val-sede");
        const inputArea = row.querySelector(".val-area");
        const selectCapacidad = row.querySelector(".val-capacidad");
        const inputGabinete = row.querySelector(".val-gabinete");
        const checkboxInstalado = row.querySelector(".val-instalado");
        const inputReporte = row.querySelector(".val-reporte");
        const btnLink = row.querySelector(".report-link-btn");
        
        const saveRowData = async () => {
            const index = cabinets.findIndex(x => x.id === c.id);
            if (index !== -1) {
                const oldSede = cabinets[index].sede;
                const updatedSede = inputSede.value.trim();
                const updatedArea = inputArea.value.trim();
                const updatedCapacidad = selectCapacidad.value;
                const updatedGabinete = inputGabinete.value.trim();
                const updatedReporte = inputReporte.value.trim();

                cabinets[index].sede = updatedSede;
                cabinets[index].area = updatedArea;
                cabinets[index].capacidad = updatedCapacidad;
                cabinets[index].gabinete = updatedGabinete;
                cabinets[index].reporteUrl = updatedReporte;
                
                // Update link button status
                if (cabinets[index].reporteUrl) {
                    btnLink.href = cabinets[index].reporteUrl;
                    btnLink.classList.remove("disabled");
                } else {
                    btnLink.href = "#";
                    btnLink.classList.add("disabled");
                }
                
                try {
                    await window.updateCabinet(c.id, {
                        sede: updatedSede,
                        area: updatedArea,
                        capacidad: updatedCapacidad,
                        gabinete: updatedGabinete,
                        reporteUrl: updatedReporte
                    });
                    showToast("Cambios guardados en Firestore", "success");
                } catch (err) {
                    console.error("Error al actualizar gabinete:", err);
                    showToast("Error al guardar cambios en Firestore", "error");
                }
                
                // If Sede changed, repopulate filter dropdown
                if (oldSede !== cabinets[index].sede) {
                    populateSedeDropdown();
                }
                
                updateKPIs();
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                e.target.blur();
            }
        };

        inputSede.addEventListener("blur", saveRowData);
        inputSede.addEventListener("keydown", handleKeyDown);
        inputArea.addEventListener("blur", saveRowData);
        inputArea.addEventListener("keydown", handleKeyDown);
        selectCapacidad.addEventListener("change", saveRowData);
        inputGabinete.addEventListener("blur", saveRowData);
        inputGabinete.addEventListener("keydown", handleKeyDown);
        inputReporte.addEventListener("blur", saveRowData);
        inputReporte.addEventListener("keydown", handleKeyDown);

        checkboxInstalado.addEventListener("change", async (e) => {
            const index = cabinets.findIndex(x => x.id === c.id);
            if (index !== -1) {
                const isChecked = e.target.checked;
                cabinets[index].instalado = isChecked;
                try {
                    await window.updateCabinet(c.id, { instalado: isChecked });
                    updateKPIs();
                    
                    if (isChecked) {
                        row.classList.add("row-installed");
                        showToast("Gabinete marcado como Instalado", "success");
                    } else {
                        row.classList.remove("row-installed");
                        showToast("Gabinete marcado como Pendiente", "success");
                    }
                } catch (err) {
                    console.error("Error al actualizar estado de instalación:", err);
                    showToast("Error al guardar estado en Firestore", "error");
                }
            }
        });

        // Row button events
        row.querySelector(".duplicate-row-btn").addEventListener("click", () => duplicateRow(c.id));
        row.querySelector(".delete-row-btn").addEventListener("click", () => deleteRow(c.id));

        tableBody.appendChild(row);
    });
}

// Update Dashboard Statistics Cards
function updateKPIs() {
    const total = cabinets.length;
    const installed = cabinets.filter(c => c.instalado).length;
    const pending = total - installed;
    
    // Numbers
    installedCountEl.textContent = installed;
    pendingCountEl.textContent = pending;
    installedFraction.textContent = `${installed}/${total}`;
    
    // Percentage
    const percentage = total > 0 ? Math.round((installed / total) * 100) : 0;
    progressPercentage.textContent = `${percentage}%`;
    
    // SVG Circular progress ring calculation
    const radius = 40;
    const circumference = 2 * Math.PI * radius; // ~251.327
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percentage / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;

    // Leaderboard / Breakdown of progress by Sede
    renderSedeBreakdown();
}

// Render progress bar per Sede in the KPI Summary
function renderSedeBreakdown() {
    sedeBreakdownEl.innerHTML = "";
    
    // Gather statistics per Sede
    const sedeStats = {};
    cabinets.forEach(c => {
        const s = c.sede || "No especificado";
        if (!sedeStats[s]) {
            sedeStats[s] = { total: 0, installed: 0 };
        }
        sedeStats[s].total++;
        if (c.instalado) {
            sedeStats[s].installed++;
        }
    });

    // Convert to sorted array by progress or name
    const sortedSedes = Object.keys(sedeStats).sort((a, b) => {
        if (a === "No especificado") return 1;
        if (b === "No especificado") return -1;
        return a.localeCompare(b);
    });

    sortedSedes.forEach(s => {
        const stats = sedeStats[s];
        const pct = stats.total > 0 ? Math.round((stats.installed / stats.total) * 100) : 0;
        
        const item = document.createElement("div");
        item.className = "breakdown-item";
        item.innerHTML = `
            <div class="breakdown-info">
                <span class="breakdown-name">${s}</span>
                <span class="breakdown-pct">${stats.installed}/${stats.total} (${pct}%)</span>
            </div>
            <div class="breakdown-progress-bar">
                <div class="breakdown-fill" style="width: ${pct}%;"></div>
            </div>
        `;
        sedeBreakdownEl.appendChild(item);
    });
}

// Add a new row to the tracking sheet
async function addNewRow() {
    const newId = "custom-" + Date.now();
    const maxOrder = cabinets.length > 0 ? Math.max(...cabinets.map(cab => cab.order ?? 0)) : -1;
    const newCabinet = {
        id: newId,
        sede: "Nueva Sede",
        area: "Nueva Área",
        capacidad: "No especificado",
        gabinete: "Suministro e Instalación de Gabinete Protecciones electricas A/A Monofasico",
        instalado: false,
        reporteUrl: "",
        order: maxOrder + 1
    };
    
    try {
        cabinets.push(newCabinet);
        await window.createCabinet(newCabinet);
        populateSedeDropdown();
        renderApp();
        
        // Scroll to the new row
        setTimeout(() => {
            const newRow = document.querySelector(`tr[data-id="${newId}"]`);
            if (newRow) {
                newRow.scrollIntoView({ behavior: "smooth", block: "center" });
                newRow.classList.add("row-highlight-pulse");
                setTimeout(() => newRow.classList.remove("row-highlight-pulse"), 2000);
                
                // Focus on Sede input of the new row
                const sedeInput = newRow.querySelector(".val-sede");
                if (sedeInput) sedeInput.focus();
            }
        }, 100);
        
        showToast("Nuevo gabinete agregado al final", "success");
    } catch (err) {
        console.error("Error al agregar fila:", err);
        showToast("Error al agregar el registro en Firestore", "error");
    }
}

// Duplicate a specific row
async function duplicateRow(id) {
    const index = cabinets.findIndex(c => c.id === id);
    if (index !== -1) {
        const original = cabinets[index];
        const copyId = "dup-" + Date.now();
        
        const originalOrder = original.order ?? 0;
        const nextCabinet = cabinets[index + 1];
        const nextOrder = nextCabinet ? (nextCabinet.order ?? (originalOrder + 1)) : (originalOrder + 1);
        const cloneOrder = (originalOrder + nextOrder) / 2;

        const clone = {
            ...original,
            id: copyId,
            instalado: false,
            reporteUrl: "",
            order: cloneOrder
        };
        
        try {
            // Insert right after the original row
            cabinets.splice(index + 1, 0, clone);
            await window.createCabinet(clone);
            renderApp();
            
            // Visual indicator
            setTimeout(() => {
                const dupRow = document.querySelector(`tr[data-id="${copyId}"]`);
                if (dupRow) {
                    dupRow.scrollIntoView({ behavior: "smooth", block: "center" });
                    dupRow.classList.add("row-highlight-pulse");
                    setTimeout(() => dupRow.classList.remove("row-highlight-pulse"), 2000);
                }
            }, 100);

            showToast("Gabinete duplicado", "success");
        } catch (err) {
            console.error("Error al duplicar gabinete:", err);
            showToast("Error al duplicar el registro en Firestore", "error");
        }
    }
}

// Delete a row with confirmation
function deleteRow(id) {
    const index = cabinets.findIndex(c => c.id === id);
    if (index !== -1) {
        const cabinet = cabinets[index];
        const desc = `${cabinet.sede} - ${cabinet.area} (${cabinet.capacidad})`;
        
        showConfirmModal(
            "Eliminar Registro",
            `¿Estás seguro de que deseas eliminar este gabinete de protección eléctrica? <br><strong>${desc}</strong>`,
            async () => {
                try {
                    cabinets.splice(index, 1);
                    await window.deleteCabinet(id);
                    populateSedeDropdown();
                    renderApp();
                    showToast("Registro eliminado con éxito", "success");
                } catch (err) {
                    console.error("Error al eliminar gabinete:", err);
                    showToast("Error al eliminar el registro en Firestore", "error");
                }
            }
        );
    }
}

// Export data to CSV (Excel compatible)
function exportToCSV() {
    if (cabinets.length === 0) {
        showToast("No hay datos para exportar", "error");
        return;
    }
    
    // CSV Header (Spanish to match instructions)
    let csvContent = "\ufeff"; // BOM for Excel UTF-8 support
    csvContent += "Sede;Área;Capacidad del Equipo;Gabinete de Protección Eléctrica;Instalado;Link de Reporte\r\n";
    
    cabinets.forEach(c => {
        const rowData = [
            c.sede || "No especificado",
            c.area || "No especificado",
            c.capacidad || "No especificado",
            c.gabinete || "No especificado",
            c.instalado ? "SI" : "NO",
            c.reporteUrl || ""
        ];
        
        // Escape quotes and format row with semicolons (standard for Excel in Spanish locales)
        const escapedRow = rowData.map(val => {
            const strVal = String(val).replace(/"/g, '""');
            return `"${strVal}"`;
        }).join(";");
        
        csvContent += escapedRow + "\r\n";
    });
    
    // Download Trigger
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Eco_Ingenieria_Seguimiento_Gabinetes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Archivo CSV descargado con éxito", "success");
}

// Backup current database to JSON file
function backupJSON() {
    const backupStr = JSON.stringify(cabinets, null, 2);
    const blob = new Blob([backupStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `respaldo_gabinetes_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Respaldo JSON descargado", "success");
}

// Import database from JSON file
function importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const parsed = JSON.parse(e.target.result);
            if (Array.isArray(parsed)) {
                // Quick validation of object schema
                const isValid = parsed.every(item => 
                    item.hasOwnProperty("sede") && 
                    item.hasOwnProperty("area") && 
                    item.hasOwnProperty("capacidad") && 
                    item.hasOwnProperty("instalado")
                );
                
                if (isValid) {
                    // Assign new IDs if missing
                    parsed.forEach((item, idx) => {
                        if (!item.id) item.id = `imported-${idx}-${Date.now()}`;
                    });
                    
                    showConfirmModal(
                        "Importar Respaldo",
                        `Se cargará un respaldo con ${parsed.length} gabinetes. Esto reemplazará COMPLETAMENTE tus datos actuales de seguimiento. ¿Deseas continuar?`,
                        async () => {
                            showToast("Importando respaldo...", "info");
                            try {
                                // Delete current documents
                                for (const cab of cabinets) {
                                    await window.deleteCabinet(cab.id);
                                }
                                // Insert imported documents
                                for (let i = 0; i < parsed.length; i++) {
                                    if (parsed[i].order === undefined) {
                                        parsed[i].order = i;
                                    }
                                    await window.createCabinet(parsed[i]);
                                }
                                cabinets = parsed;
                                populateSedeDropdown();
                                renderApp();
                                showToast("Base de datos restaurada con éxito", "success");
                            } catch (err) {
                                console.error("Error al importar respaldo:", err);
                                showToast("Error al restaurar los datos en Firestore", "error");
                            }
                        }
                    );
                } else {
                    showToast("El archivo no tiene el formato de datos esperado", "error");
                }
            } else {
                showToast("Formato de respaldo inválido", "error");
            }
        } catch (err) {
            showToast("Error al parsear el archivo JSON", "error");
            console.error(err);
        }
        importFileInput.value = ""; // reset input
    };
    reader.readAsText(file);
}

// Show custom confirmation modal dialog
function showConfirmModal(title, message, onOk) {
    confirmTitle.textContent = title;
    confirmMessage.innerHTML = message;
    pendingDialogAction = onOk;
    confirmDialog.style.display = "flex";
}

function hideConfirmModal() {
    confirmDialog.style.display = "none";
    pendingDialogAction = null;
}

// Toast System
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "check_circle";
    if (type === "error") icon = "error";
    
    toast.innerHTML = `
        <span class="material-symbols-rounded" style="font-size:18px;">${icon}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger fade out
    setTimeout(() => {
        toast.style.animation = "toastIn 0.3s cubic-bezier(0.2, 0, 0, 1) reverse forwards";
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 2500);
}

// Add dynamic styling for animation pulses on duplicate/add rows
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulseHighlight {
    0% { background-color: var(--primary-container); }
    100% { background-color: transparent; }
}
.row-highlight-pulse td {
    animation: pulseHighlight 2s ease-out;
}
`;
document.head.appendChild(style);
// Ultima actualizacion: 2026-06-22 - Integracion Firestore exitosa
