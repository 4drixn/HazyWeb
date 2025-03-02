document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ Script cargado correctamente");

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const authSection = document.querySelector(".hero-content");
    const dashboardSection = document.getElementById("dashboard");
    const botStatus = document.getElementById("botStatus");

    const ADMIN_IDS = ["1096843631513583757", "786094453772386324", "823695181362364438"];
    const API_BASE = "https://api-panel.hazybot.net";
    const REDIRECT_URI = "https://www.hazybot.net/panel.html";

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const userToken = localStorage.getItem("discord_token");
    const userId = localStorage.getItem("user_id");

    // ✅ Mostrar botón de login si no hay token
    if (!userToken) {
        authSection.style.display = "block";
        dashboardSection.style.display = "none";
    } else {
        authSection.style.display = "none";
        dashboardSection.style.display = "block";
    }

    // ✅ Evento para iniciar sesión
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            console.log("🔹 Redirigiendo a Discord OAuth...");
            window.location.href = `https://discord.com/api/oauth2/authorize?client_id=1342201886727475200&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
        });
    }

    // ✅ Manejo de autenticación con código de Discord
    if (code) {
        try {
            console.log("🔹 Código OAuth recibido, autenticando...");

            const response = await fetch(`${API_BASE}/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });

            const data = await response.json();
            console.log("🔹 Respuesta de autenticación:", data);

            if (data.token && data.user && ADMIN_IDS.includes(data.user.id)) {
                console.log("✅ Usuario autorizado como admin");

                localStorage.setItem("discord_token", data.token);
                localStorage.setItem("user_id", data.user.id);
                window.location.href = "dashboard.html";
            } else {
                alert("⚠️ No tienes permisos para acceder al panel.");
                localStorage.clear();
                window.location.href = "panel.html";
            }
        } catch (error) {
            console.error("❌ Error en la autenticación:", error);
            localStorage.clear();
        }
    }

    // ✅ Si el usuario no está autenticado y NO ha intentado iniciar sesión, permitir login
    if (!userToken) {
        return;
    }

    // ✅ Si el usuario no es admin, sacarlo del panel
    if (!userId || !ADMIN_IDS.includes(userId)) {
        console.warn("🚨 Usuario no autorizado, redirigiendo...");
        localStorage.clear();
        window.location.href = "panel.html";
        return;
    }

    console.log("✅ Usuario autenticado, mostrando dashboard");
    authSection.style.display = "none";
    dashboardSection.style.display = "block";

    // ✅ Obtener estado del bot
    fetch(`${API_BASE}/bot-status`, {
        headers: { "Authorization": `Bearer ${userToken}` }
    })
    .then(response => response.json())
    .then(data => {
        botStatus.textContent = data.status || "Desconocido";
        console.log("✅ Estado del bot:", data.status);
    })
    .catch(error => console.error("❌ Error al obtener estado del bot:", error));

    // ✅ Botón de logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            console.log("🔹 Cerrando sesión...");
            localStorage.clear();
            window.location.href = "panel.html";
        });
    }
});
