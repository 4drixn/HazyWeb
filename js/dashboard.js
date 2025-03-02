document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ Dashboard cargado correctamente");

    const logoutBtn = document.getElementById("logoutBtn");
    const botStatus = document.getElementById("botStatus");
    const dashboardSection = document.getElementById("dashboard");

    const ADMIN_IDS = ["1096843631513583757", "786094453772386324", "823695181362364438"];
    const API_BASE = "https://api-panel.hazybot.net";

    const userToken = localStorage.getItem("discord_token");
    const userId = localStorage.getItem("user_id");

    if (!userToken || !ADMIN_IDS.includes(userId)) {
        console.warn("🚨 Usuario no autorizado, redirigiendo a panel.html...");
        localStorage.clear();
        window.location.href = "panel.html";
        return;
    }

    console.log("✅ Usuario autorizado, mostrando dashboard.");
    dashboardSection.style.display = "block";

    fetch(`${API_BASE}/bot-status`, {
        headers: { "Authorization": `Bearer ${userToken}` }
    })
    .then(response => response.json())
    .then(data => {
        botStatus.textContent = data.status || "Desconocido";
        console.log("✅ Estado del bot:", data.status);
    })
    .catch(error => console.error("❌ Error al obtener estado del bot:", error));

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            console.log("🔹 Cerrando sesión...");
            localStorage.clear();
            window.location.href = "panel.html";
        });
    }

    document.getElementById("sendMessage")?.addEventListener("click", function () {
        fetch(`${API_BASE}/send-message`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${userToken}` }
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("❌ Error al enviar mensaje:", error));
    });

    document.getElementById("kickUser")?.addEventListener("click", function () {
        fetch(`${API_BASE}/kick-user`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${userToken}` }
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("❌ Error al expulsar usuario:", error));
    });
});
