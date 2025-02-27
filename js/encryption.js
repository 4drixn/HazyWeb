const targetText = "El Bot Definitivo para Discord";
let encryptedText = "█".repeat(targetText.length);
let index = 0;

function decryptText() {
    if (index < targetText.length) {
        encryptedText = encryptedText.substring(0, index) + targetText[index] + encryptedText.substring(index + 1);
        document.getElementById("animated-text").textContent = encryptedText;
        index++;
        setTimeout(decryptText, 50);
    }
}

window.onload = decryptText;
