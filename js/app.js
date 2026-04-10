// =========================
// APP.JS PRO+ (VERSION CORRIGÉE)
// =========================

import { initMap } from "./map.js";
import "./helpers.js";
import "./metar.js";
import "./taf.js";
import "./fids.js";
import "./sonometers.js";

import { updateStatusPanel } from "./status.js";
import { updateLogs } from "./logs.js";
import { startLiveLogs } from "./logsLive.js";

// ============================
// INITIALISATION UNIQUE
// ============================

document.addEventListener("DOMContentLoaded", () => {
    console.log("[APP] Initialisation…");

    const map = initMap();

    if (!map) {
        console.error("[APP ERROR] La carte n'a pas pu être initialisée.");
        return;
    }

    console.log("[APP] Carte prête. Modules chargés.");

    // Modules de monitoring
    updateStatusPanel();
    updateLogs();
    startLiveLogs();
});

// ============================
// SIDEBAR TOGGLE PRO+
// ============================

const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("sidebar-toggle");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});
