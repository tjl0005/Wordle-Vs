document.getElementById("home").onclick = function () {
    location.href = "game.html";
};
document.getElementById("easy_mode").onclick = function () {
    document.getElementById("mode_label").innerText = "Your currently playing in Easy mode"
};
document.getElementById("default_mode").onclick = function () {
    document.getElementById("mode_label").innerText = "Your currently playing in Default mode"
};
document.getElementById("hard_mode").onclick = function () {
    document.getElementById("mode_label").innerText = "Your currently playing in Hard mode"
};