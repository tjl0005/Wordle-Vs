// Take user to destination page
function redirect(dest){
    location.href = dest + ".html";
}

window.onload = function homeInit(){
    let userMode = getCookie("userMode");
    if (userMode === ""){
        setMode("Default");
        userMode = "default";
    }

    if (getCookie("stats") === ""){
        let stats = {
            "streak": 0,
            "plays": 0,
            "wins": 0,
        }
        let statsCookie = JSON.stringify(stats);
        document.cookie = "stats = " + statsCookie + "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
        document.getElementById("streak_label").innerText = "0";
    }
    if (getCookie("gameSettings") === ""){
        let gameSettings = {
            "playerLetters": "On", // Visible letters
            "playerColours": "On", // Visible Colours
            "playerPresent": "On", // Not implemented
            "playerCorrect": "On", // Not implemented
            "compLetters": "On",
            "compColours": "On",
            "compPresent": "On",
            "compCorrect": "On",
        };

        let gameSettingsCookie = JSON.stringify(gameSettings);
        document.cookie = "gameSettings = " + gameSettingsCookie + "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    }
    if (getCookie("displaySettings") === ""){
        let displaySettings = {
            "darkMode": "Off",
            "displayFont": "1.0em",
        };

        let displaySettingsCookie = JSON.stringify(displaySettings);
        document.cookie = "displaySettings = " + displaySettingsCookie + "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    }
    if (getCookie("otherSettings") === ""){
        let otherSettings = {
            "hintsEnabled": "On",
            "showBreakdown": "Off",
        };

        let otherSettingsCookie = JSON.stringify(otherSettings);
        document.cookie = "otherSettings = " + otherSettingsCookie + "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    }

    if (getCookie("reset")){
        document.cookie = "reset=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        redirect("settings")
    }

    document.getElementById(userMode.toLowerCase()).style.color = "green";
    document.getElementById(userMode.toLowerCase()).style.fontSize = "1.2em";
    let stats = [JSON.parse(getCookie("stats"))]

    // Go through all settings and update the page
    for(let i = 0; i < stats.length; i++) {
        for (let [stat, value] of Object.entries(stats[i])) {
            console.log(stat)
            if (stat === "streak") {
                document.getElementById(stat).innerText = value.toString();
            } else {
                document.getElementById(stat).innerHTML = value.toString();
            }
        }
    }
};

// Given a cookie name get its value
function getCookie(cname) {
    return document.cookie.match('(^|;)\\s*' + cname + '\\s*=\\s*([^;]+)')?.pop() || '';
}

// Update game mode to given value
function setMode(mode){
    let previousMode = getCookie("userMode")
    if (mode === ""){
        mode = getCookie("userMode");
    }
    // Update mode cookie and the display text
    document.cookie = "userMode = " + mode +  "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";

    // Update displayed text to indicate current mode
    document.getElementById(mode.toLowerCase()).style.color = "green";
    document.getElementById(mode.toLowerCase()).style.fontSize = "1.2em";
    document.getElementById(previousMode.toLowerCase()).style.color = "black";
    document.getElementById(previousMode.toLowerCase()).style.fontSize = "1em";
}

