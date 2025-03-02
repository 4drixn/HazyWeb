document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ Autenticación en curso...");

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const ADMIN_IDS = ["1096843631513583757", "786094453772386324", "823695181362364438"];

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

            if (!data || !data.token || !data.user || !data.user.id) {
                console.error("❌ Error: No se recibió un user.id válido.");
                alert("⚠️ Error en la autenticación. Intenta de nuevo.");
                localStorage.clear();
                window.location.href = "index.html";
                return;
            }

            console.log(`🔹 ID recibido: ${data.user.id}`);

            if (ADMIN_IDS.includes(data.user.id)) {
                console.log("✅ Usuario autorizado como admin");

                localStorage.setItem("discord_token", data.token);
                localStorage.setItem("user_id", data.user.id);
                window.location.href = "dashboard.html"; 
            } else {
                alert("⚠️ No tienes permisos para acceder al panel.");
                localStorage.clear();
                window.location.href = "index.html";
            }
        } catch (error) {
            console.error("❌ Error en la autenticación:", error);
            alert("⚠️ Error en la autenticación. Intenta de nuevo.");
            localStorage.clear();
            window.location.href = "index.html";
        }
    } else {
        console.warn("🚨 No se encontró el código OAuth, redirigiendo...");
        window.location.href = "index.html";
    }
});
