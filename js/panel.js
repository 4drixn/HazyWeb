document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Panel cargado correctamente");

    const loginBtn = document.getElementById("loginBtn");
    const authSection = document.querySelector(".hero-content");

    if (!loginBtn || !authSection) {
        console.error("❌ Elementos del login no encontrados.");
        return;
    }

    loginBtn.addEventListener("click", function () {
        console.log("🔹 Redirigiendo a Discord OAuth...");
        window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1342201886727475200&redirect_uri=https://www.hazybot.net/auth.html&response_type=code&scope=identify";
    });

    const userToken = localStorage.getItem("discord_token");
    const userId = localStorage.getItem("user_id");
    if (userToken && userId) {
        window.location.href = "dashboard.html";
    }
});
