document.addEventListener("DOMContentLoaded", function () {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.7, "random": true },
            "size": { "value": 1.8, "random": true },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 0.5 }
        },
        "interactivity": {
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": false }
            }
        }
    });

    // Animación de entrada para el título
    const title = document.querySelector('.title');
    title.style.opacity = 0;
    setTimeout(() => {
        title.style.transition = "opacity 1.5s ease-in-out";
        title.style.opacity = 1;
    }, 500);
});
