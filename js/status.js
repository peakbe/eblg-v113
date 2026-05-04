import { API_BASE } from "./config.js";

export async function checkApiStatus() {
    const panel = document.getElementById("status-panel");
    if (!panel) return;

    const endpoints = [
        { name: "CheckWX METAR", url: `${API_BASE}/metar` },
        { name: "CheckWX TAF", url: `${API_BASE}/taf` },
        { name: "OpenSky FIDS", url: `${API_BASE}/fids` },
        { name: "Backend Render", url: `${API_BASE}/sonos` }
    ];

    panel.innerHTML = "";

    for (const ep of endpoints) {
        const t0 = performance.now();
        let status = "OK";

        try {
            const res = await fetch(ep.url);
            if (!res.ok) status = "ERR";
        } catch (e) {
            status = "ERR";
        }

        const dt = Math.round(performance.now() - t0);

        const div = document.createElement("div");
        div.className = "status-item " + (status === "OK" ? "status-ok" : "status-error");
        div.textContent = `${ep.name} — ${dt} ms`;
        panel.appendChild(div);
    }
}
