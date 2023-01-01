const modeMessage = "Your currently playing in ";
const streakMessage = "Your current streak is ";

// Take user to game page
function redirectGame(){
    location.href = "game.html";
}

// If the mode and streak cookies don't exist yet, create them with default values
window.onload = function homeInit(){
    if (getCookie("userMode") === ""){
        setMode("default");
    }
    if (getCookie("streak") === ""){
        setStreak(0);
    }

    // Update display text
    document.getElementById("mode_label").innerText = modeMessage + getCookie("userMode");
    document.getElementById("streak_label").innerText = streakMessage + getCookie("streak");
};

// Given a cookie name get its value
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Update game mode to given value
function setMode(mode){
    if (mode === ""){
        mode = getCookie("userMode")
    }
    // Update mode cookie and the display text
    document.cookie = "userMode = " + mode +  " mode; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    document.getElementById("mode_label").innerText = modeMessage + mode + " mode";
}

// Update the streak cookie with given value
function setStreak(streak){
    document.cookie = "streak = " + streak + "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    document.getElementById("streak_label").innerText = streakMessage + streak;
}