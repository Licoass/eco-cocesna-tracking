/********************************************************************
 * ECO INGENIERÍA - GABINETES
 * VERSION SIMPLE FIRESTORE
 ********************************************************************/

import {
    listenCabinets,
    createCabinet,
    updateCabinet,
    deleteCabinet,
    duplicateCabinet
} from "./firestore.service.js";

/********************************************************************
 * ESTADO GLOBAL
 ********************************************************************/

let cabinets = [];

/********************************************************************
 * INICIO
 ********************************************************************/

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 App iniciada");

    listenCabinets((data) => {

        cabinets = data;

        renderApp();

    });

});

/********************************************************************
 * RENDER PRINCIPAL
 ********************************************************************/

function renderApp() {

    renderKPIs();
    renderTable();

}

/********************************************************************
 * KPIs
 ********************************************************************/

function renderKPIs() {

    const total = cabinets.length;

    const installed = cabinets.filter(c => c.instalado).length;

    const pending = total - installed;

    const percent = total ? Math.round((installed / total) * 100) : 0;

    document.getElementById("installed-count").textContent = installed;
    document.getElementById("pending-count").textContent = pending;
    document.getElementById("progress-percentage").textContent = percent + "%";

}

/********************************************************************
 * TABLA
 ********************************************************************/

function renderTable() {

    const tbody = document.getElementById("table-body");

    if (!tbody) return;

    tbody.innerHTML = "";

    cabinets.forEach(c => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${c.sede || ""}</td>
            <td>${c.area || ""}</td>
            <td>${c.capacidad || ""}</td>
            <td>${c.gabinete || ""}</td>

            <td>
                <input type="checkbox"
                    ${c.instalado ? "checked" : ""}
                    onchange="toggleInstalled('${c.id}', this.checked)">
            </td>

            <td>
                <input type="text"
                    value="${c.reporteUrl || ""}"
                    onchange="updateReport('${c.id}', this.value)"
                    placeholder="URL">
            </td>

            <td>
                <button onclick="duplicateRow('${c.id}')">📄</button>
                <button onclick="deleteRow('${c.id}')">🗑</button>
            </td>
        `;

        tbody.appendChild(row);

    });

}

/********************************************************************
 * ACCIONES FIRESTORE
 ********************************************************************/

window.toggleInstalled = async function (id, value) {

    await updateCabinet(id, { instalado: value });

};

window.updateReport = async function (id, url) {

    await updateCabinet(id, { reporteUrl: url });

};

window.deleteRow = async function (id) {

    if (!confirm("¿Eliminar gabinete?")) return;

    await deleteCabinet(id);

};

window.duplicateRow = async function (id) {

    await duplicateCabinet(id);

};