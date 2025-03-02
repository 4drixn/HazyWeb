const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CLIENT_ID = "TU_CLIENT_ID";
const CLIENT_SECRET = "TU_CLIENT_SECRET";
const REDIRECT_URI = "https://www.hazybot.net/panel.html"; 

app.post("/auth", async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Código no proporcionado" });

    try {
        const discordResponse = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: REDIRECT_URI
            })
        });

        const discordData = await discordResponse.json();
        console.log("🔹 Respuesta de Discord:", discordData);

        if (!discordData.access_token) {
            return res.status(400).json({ error: "Error al obtener token" });
        }

        res.json({ token: discordData.access_token, user: discordData });
    } catch (error) {
        console.error("❌ Error en la autenticación con Discord:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

app.listen(3000, () => console.log("✅ Servidor corriendo en el puerto 3000"));
