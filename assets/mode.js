document.addEventListener("DOMContentLoaded", function () {
  const themeSelector = document.getElementById("theme-selector");
  const currentTheme = localStorage.getItem("theme") || "dark";

  document.body.classList.add(currentTheme);
  themeSelector.value = currentTheme;

  themeSelector.addEventListener("change", function () {
    const selectedTheme = themeSelector.value;
    document.body.classList.remove("light", "dark");
    document.body.classList.add(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  });
});
