document.getElementById("loginBtn").addEventListener("click", function() {
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1342201886727475200&redirect_uri=https://www.hazybot.net/panel.html&response_type=code&scope=identify";
});

document.getElementById("sendMessage").addEventListener("click", function() {
    fetch("https://TU_BACKEND_URL/send-message", { method: "POST" })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Error:", error));
});

document.getElementById("kickUser").addEventListener("click", function() {
    fetch("https://TU_BACKEND_URL/kick-user", { method: "POST" })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Error:", error));
});
