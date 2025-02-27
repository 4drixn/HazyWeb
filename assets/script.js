document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.querySelector(".scramble-text");
  const text = "El Bot Definitivo para Discord";
  let iteration = 0;

  function scrambleText() {
    const characters = "!<>-_\\/[]{}—=+*^?#________";
    let output = text.split("").map((_, i) =>
      i < iteration ? text[i] : characters[Math.floor(Math.random() * characters.length)]
    ).join("");
    
    textEl.innerText = output;
    iteration++;

    if (iteration <= text.length) {
      setTimeout(scrambleText, 50);
    }
  }

  scrambleText();
});
