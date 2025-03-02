document.addEventListener("DOMContentLoaded", async function () {
    const dashboardSection = document.getElementById("dashboard");
    const botStatus = document.getElementById("botStatus");
    const logoutBtn = document.getElementById("logoutBtn");

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
        try {
            const response = await fetch("https://api-panel.hazybot.net/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem("discord_token", data.token);
                localStorage.setItem("user_id", data.user.id);
                window.location.href = "dashboard.html";
            } else {
                alert("Error al autenticar.");
                window.location.href = "panel.html";
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            window.location.href = "panel.html";
        }
    }

    const userToken = localStorage.getItem("discord_token");
    const userId = localStorage.getItem("user_id");

    if (!userToken) {
        alert("No tienes acceso a esta página.");
        window.location.href = "panel.html";
        return;
    }

    const admins = ["1096843631513583757", "786094453772386324", "823695181362364438"];

    if (!admins.includes(userId)) {
        alert("No tienes permisos para acceder al panel.");
        window.location.href = "panel.html";
        return;
    }

    fetch("https://api-panel.hazybot.net/bot-status", {
        headers: { "Authorization": `Bearer ${userToken}` }
    })
        .then(response => response.json())
        .then(data => botStatus.textContent = data.status || "Desconocido")
        .catch(error => console.error("Error al obtener estado del bot:", error));

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("discord_token");
        localStorage.removeItem("user_id");
        window.location.href = "panel.html";
    });

    document.getElementById("sendMessage").addEventListener("click", function () {
        fetch("https://api-panel.hazybot.net/send-message", {
            method: "POST",
            headers: { "Authorization": `Bearer ${userToken}` }
        })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => console.error("Error:", error));
    });

    document.getElementById("kickUser").addEventListener("click", function () {
        fetch("https://api-panel.hazybot.net/kick-user", {
            method: "POST",
            headers: { "Authorization": `Bearer ${userToken}` }
        })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => console.error("Error:", error));
    });
});
