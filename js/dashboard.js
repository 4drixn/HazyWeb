document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ Dashboard cargado correctamente");

    const API_BASE = "https://api-panel.hazybot.net";
    const userToken = localStorage.getItem("discord_token");
    const botStatus = document.getElementById("botStatus");

    if (!userToken) {
        console.warn("🚨 Usuario no autenticado, redirigiendo...");
        window.location.href = "index.html";
        return;
    }

    async function fetchBotStatus() {
        try {
            const response = await fetch(`${API_BASE}/bot-status`, {
                headers: { "Authorization": `Bearer ${userToken}` }
            });
            const data = await response.json();
            botStatus.textContent = data.status || "Desconocido";
        } catch (error) {
            console.error("❌ Error al obtener estado del bot:", error);
        }
    }

    async function saveSettings() {
        const settings = {
            ticket_channel: document.getElementById("ticketChannel").value,
            logs_channel: document.getElementById("logChannel").value,
            verification_channel: document.getElementById("verificationChannel").value,
            suggestion_channel: document.getElementById("suggestionChannel").value
        };

        try {
            const response = await fetch(`${API_BASE}/update-config`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify(settings)
            });

            const data = await response.json();
            alert(data.message || "Configuración guardada con éxito.");
        } catch (error) {
            console.error("❌ Error al guardar configuración:", error);
        }
    }

    document.getElementById("saveSettings").addEventListener("click", saveSettings);
    fetchBotStatus();
});
