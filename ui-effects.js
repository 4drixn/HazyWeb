document.addEventListener("DOMContentLoaded", function () {
    let elements = document.querySelectorAll(".fade-in, .slide-in");
    elements.forEach((el) => {
        el.style.opacity = 0;
    });

    function revealElements() {
        elements.forEach((el) => {
            let rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
