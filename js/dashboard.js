document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Dashboard cargado correctamente");

    const logoutBtn = document.getElementById("logoutBtn");
    const botStatus = document.getElementById("botStatus");

    const userToken = localStorage.getItem("discord_token");
    const userId = localStorage.getItem("user_id");

    const ADMIN_IDS = ["1096843631513583757", "786094453772386324", "823695181362364438"];

    if (!userToken || !userId || !ADMIN_IDS.includes(userId)) {
        console.warn("🚨 Acceso denegado, redirigiendo...");
        localStorage.clear();
        window.location.href = "index.html";
        return;
    }

    console.log("✅ Usuario autenticado, mostrando dashboard");

    fetch("https://api-panel.hazybot.net/bot-status", {
        headers: { "Authorization": `Bearer ${userToken}` }
    })
        .then(response => response.json())
        .then(data => {
            botStatus.textContent = data.status || "Desconocido";
        })
        .catch(error => console.error("❌ Error al obtener estado del bot:", error));

    logoutBtn?.addEventListener("click", function () {
        console.log("🔹 Cerrando sesión...");
        localStorage.clear();
        window.location.href = "index.html";
    });
});
