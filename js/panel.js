document.addEventListener("DOMContentLoaded", async function () {
    const loginBtn = document.getElementById("loginBtn");
    const authSection = document.getElementById("auth");
    const dashboardSection = document.getElementById("dashboard");
    const botStatus = document.getElementById("botStatus");

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
                window.location.href = "panel.html";
            } else {
                alert("Error al autenticar.");
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
        }
    }

    const userToken = localStorage.getItem("discord_token");
    if (userToken) {
        authSection.style.display = "none";
        dashboardSection.style.display = "block";

        fetch("https://api-panel.hazybot.net/bot-status")
            .then(response => response.json())
            .then(data => botStatus.textContent = data.status || "Desconocido")
            .catch(error => console.error("Error al obtener estado del bot:", error));
    }

    loginBtn.addEventListener("click", function () {
        window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1342201886727475200&redirect_uri=https://www.hazybot.net/panel.html&response_type=code&scope=identify";
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
