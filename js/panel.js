document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ Script cargado correctamente");

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const authSection = document.querySelector(".hero-content");
    const dashboardSection = document.getElementById("dashboard");
    const botStatus = document.getElementById("botStatus");

    dashboardSection.style.display = "none"; 

    const ADMIN_IDS = ["1096843631513583757", "786094453772386324", "823695181362364438"];
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const userToken = localStorage.getItem("discord_token");
    const userId = localStorage.getItem("user_id");

    if (code) {
        try {
            console.log("🔹 Código OAuth recibido, autenticando...");

            const response = await fetch("https://api-panel.hazybot.net/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });

            const data = await response.json();
            console.log("🔹 Respuesta de autenticación:", data);

            if (data.token && ADMIN_IDS.includes(data.user.id)) {
                console.log("✅ Usuario autorizado como admin");

                localStorage.setItem("discord_token", data.token);
                localStorage.setItem("user_id", data.user.id);
                window.location.href = "panel.html"; 
                return;
            } else {
                alert("⚠️ No tienes permisos para acceder al panel.");
                window.location.href = "index.html"; 
                return;
            }
        } catch (error) {
            console.error("❌ Error en la autenticación:", error);
            window.location.href = "index.html"; 
            return;
        }
    }

    if (!userToken || !ADMIN_IDS.includes(userId)) {
        console.warn("🚨 Usuario no autorizado, cerrando sesión.");
        localStorage.removeItem("discord_token");
        localStorage.removeItem("user_id");
        return;
    }

    console.log("✅ Usuario autenticado, mostrando dashboard");
    authSection.style.display = "none";
    dashboardSection.style.display = "block";

    fetch("https://api-panel.hazybot.net/bot-status", {
        headers: { "Authorization": `Bearer ${userToken}` }
    })
    .then(response => response.json())
    .then(data => {
        botStatus.textContent = data.status || "Desconocido";
        console.log("✅ Estado del bot:", data.status);
    })
    .catch(error => console.error("❌ Error al obtener estado del bot:", error));

    logoutBtn?.addEventListener("click", function () {
        console.log("🔹 Cerrando sesión...");
        localStorage.removeItem("discord_token");
        localStorage.removeItem("user_id");
        window.location.href = "index.html";
    });

    loginBtn?.addEventListener("click", function () {
        window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1342201886727475200&redirect_uri=https://www.hazybot.net/panel.html&response_type=code&scope=identify";
    });
});
