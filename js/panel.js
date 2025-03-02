document.addEventListener("DOMContentLoaded", async function () {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const authSection = document.querySelector(".hero-content");
    const dashboardSection = document.getElementById("dashboard");
    const botStatus = document.getElementById("botStatus");

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const ADMIN_IDS = ["TU_DISCORD_ID", "OTRO_ADMIN_ID"];

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
                alert("No tienes permisos para acceder al panel.");
                window.location.href = "panel.html"; 
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
        }
    }

    const userToken = localStorage.getItem("discord_token");
    const userId = localStorage.getItem("user_id");

    if (!userToken || !ADMIN_IDS.includes(userId)) {
        console.warn("Acceso denegado. Redirigiendo...");
        window.location.href = "panel.html";
        return;
    }

    authSection.style.display = "none";
    dashboardSection.style.display = "block";

    fetch("https://api-p
