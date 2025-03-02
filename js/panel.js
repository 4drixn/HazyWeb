document.addEventListener("DOMContentLoaded", async function () {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const authSection = document.querySelector(".hero-content");
    const dashboardSection = document.getElementById("dashboard");
    const botStatus = document.getElementById("botStatus");

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const ADMIN_IDS = ["1096843631513583757", "786094453772386324", "823695181362364438"];

    const isIndexPage = window.location.pathname.includes("index.html");

    const userToken = localStorage.getItem("discord_token");
    const userId = localStorage.getItem("user_id");

    if (userToken && ADMIN_IDS.includes(userId)) {
        authSection.style.display = "none";
        dashboardSection.style.display = "block";
    }

    if (code) {
        try {
            const response = await fetch("https://api-panel.hazybot.net/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });

            const data = await response.json();

            if (data.token && ADMIN_IDS.includes(data.user.id)) {
                localStorage.setItem("discord_token", data.token);
                localStorage.setItem("user_id", data.user.id);
                window.location.href = "dashboard.html"; 
            } else {
                alert("⚠️ No tienes permisos para acceder al panel.");
                if (!isIndexPage) window.location.href = "index.html";
            }
        } catch (error) {
            console.error("❌ Error en la autenticación:", error);
            if (!isIndexPage) window.location.href = "index.html";
        }
    }

    if (!userToken) {
        console.warn("🚨 No hay token. Mostrando solo login.");
        dashboardSection.style.display = "none";  
        return;
    }

    if (!ADMIN_IDS.includes(userId)) {
        console.warn("🚨 Usuario no autorizado, cerrando sesión...");
        localStorage.removeItem("discord_token");
        localStorage.removeItem("user_id");
        if (!isIndexPage) window.location.href = "index.html";
        return;
    }

    authSection.style.display = "none";
    dashboardSection.style.display = "block";

    fetch("https://api-panel.hazybot.net/bot-status", {
        headers: { "Authorization": `Bearer ${userToken}` }
    })
    .then(response => response.json())
    .then(data => {
        botStatus.textContent = data.status || "Desconocido";
    })
    .catch(error => console.error("❌ Error al obtener estado del bot:", error));

    logoutBtn?.addEventListener("click", function () {
        localStorage.removeItem("discord_token");
        localStorage.removeItem("user_id");
        window.location.href = "index.html";
    });

    document.getElementById("sendMessage")?.addEventListener("click", function () {
        fetch("https://api-panel.hazybot.net/send-message", {
            method: "POST",
            headers: { "Authorization": `Bearer ${userToken}` }
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Error:", error));
    });

    document.getElementById("kickUser")?.addEventListener("click", function () {
        fetch("https://api-panel.hazybot.net/kick-user", {
            method: "POST",
            headers: { "Authorization": `Bearer ${userToken}` }
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Error:", error));
    });

    loginBtn?.addEventListener("click", function () {
        window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1342201886727475200&redirect_uri=https://www.hazybot.net/panel.html&response_type=code&scope=identify";
    });
});
