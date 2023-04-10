/**
 * Take user to specified destination page
 */
function redirect(dest) {
    location.href = dest + ".html";
}

/**
 * As the page is loaded make check if all cookies are present (otherwise create them) and process stats
 */
window.addEventListener('DOMContentLoaded', function() {
    let userMode = getCookie("userMode");
    if (userMode === "") {
        document.cookie = "userMode = default; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
        userMode = "default";
    }
    if (getCookie("stats") === "") {
        let stats = {
            "streak": 0,
            "plays": 0,
            "wins": 0,
        }
        let statsCookie = JSON.stringify(stats);
        document.cookie = "stats = " + statsCookie + "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
        document.getElementById("streak_label").innerText = "0";
    }
    if (getCookie("game") === "") {
        let gameSettings = {
            // Player board visibility
            "playerLetters": "On",
            "playerAbsent": "On",
            "playerPresent": "On",
            "playerCorrect": "On",
            // Competitor board visibility
            "compLetters": "On",
            "compAbsent": "On",
            "compPresent": "On",
            "compCorrect": "On",
            // Competitor can use players guesses and results
            "sharedLetters": "On",
            "sharedResults": "Off"
        };

        let gameSettingsCookie = JSON.stringify(gameSettings);
        document.cookie = "game = " + gameSettingsCookie + "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    }
    if (getCookie("displaySettings") === "") {
        let displaySettings = {
            "darkMode": "Off",
            "displayFont": "1.0em",
        };

        let displaySettingsCookie = JSON.stringify(displaySettings);
        document.cookie = "displaySettings = " + displaySettingsCookie + "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    }
    if (getCookie("other") === "") {
        let otherSettings = {
            "hintsEnabled": "On",
            "showBreakdown": "Off",
            "stepEnabled": "On",
        };

        let otherSettingsCookie = JSON.stringify(otherSettings);
        document.cookie = "other = " + otherSettingsCookie + "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    }

    if (getCookie("reset")) {
        document.cookie = "reset=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        redirect("settings");
    }

    document.getElementById(userMode).style.color = "green";
    document.getElementById(userMode).style.fontSize = "1.2em";

    if (userMode === "custom"){
        document.getElementById(userMode).hidden = false;
    } else{
        document.getElementById("custom").hidden = true;
    }

    let stats = [JSON.parse(getCookie("stats"))]

    // Go through all settings and update the page
    for (let i = 0; i < stats.length; i++) {
        for (let [stat, value] of Object.entries(stats[i])) {
            if (stat === "streak") {
                document.getElementById(stat).innerText = value.toString();
            } else {
                document.getElementById(stat).innerHTML = value.toString();
            }
        }
    }
});

/**
 * Given a cookie name get its value
 * @param {string} cname - cookie name
 * @returns {string} cookie - specified cookie
 */
function getCookie(cname) {
    return document.cookie.match('(^|;)\\s*' + cname + '\\s*=\\s*([^;]+)')?.pop() || '';
}