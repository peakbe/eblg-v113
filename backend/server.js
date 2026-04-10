import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

async function safeFetch(url) {
    try {
        console.log("[FETCH] URL:", url);

        const res = await fetch(url);

        console.log("[FETCH] HTTP STATUS:", res.status);

        if (!res.ok) {
            const text = await res.text();
            console.error("[FETCH ERROR] Body:", text);
            return { fallback: true, status: res.status, body: text };
        }

        return await res.json();

    } catch (err) {
        console.error("[FETCH EXCEPTION]", err);
        return { fallback: true, error: err.message };
    }
}



app.get("/metar", async (req, res) => {
    res.json(await safeFetch("https://api.checkwx.com/metar/EBLG/decoded?x-api-key=YOUR_KEY"));
});

app.get("/taf", async (req, res) => {
    res.json(await safeFetch("https://api.checkwx.com/taf/EBLG/decoded?x-api-key=YOUR_KEY"));
});

app.get("/fids", async (req, res) => {
    const now = Math.floor(Date.now() / 1000);
    const begin = now - 3600;

    const url = `https://opensky-network.org/api/flights/departure?airport=EBLG&begin=${begin}&end=${now}`;

    const data = await safeFetch(url);

    // Si OpenSky renvoie une erreur → fallback propre
    if (data.fallback) {
        return res.json([{
            flight: "N/A",
            destination: "N/A",
            time: "N/A",
            status: "Unavailable",
            fallback: true,
            timestamp: new Date().toISOString()
        }]);
    }

    // Sinon → données réelles
    res.json(data);
});



app.get("/sonos", (req, res) => {
    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log("[PROXY] Running on port", PORT);
});
