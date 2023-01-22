// Take user to destination page
function redirect(dest){
    location.href = dest + ".html";
}

// If the mode and streak cookies don't exist yet, create them with default values
window.onload = function settingsInit(){
    if (getCookie("compLetters") === ""){
        setCookie("compLetters", "On");
    }
    if (getCookie("compColours") === ""){
        setCookie("compColours", "On");
    }
    if (getCookie("playerLetters") === ""){
        setCookie("playerLetters", "Off");
    }
    if (getCookie("playerColours") === ""){
        setCookie("playerColours", "Off");
    }
    if (getCookie("darkMode") === ""){
        setCookie("darkMode", "Off");
    }
    if (getCookie("hintsEnabled") === ""){
        setCookie("hintsEnabled", "On");
    }
    if (getCookie("breakdownEnabled") === ""){
        setCookie("breakdownEnabled", "Off");
    }
    if (getCookie("fontSize") === ""){
        setCookie("fontSize", "1.0em")
    }

    document.getElementById("displayFont").style.fontSize = "1.0em"
    document.getElementById("hintsEnabled").innerHTML = getCookie("hintsEnabled")
    document.getElementById("breakdownEnabled").innerHTML = getCookie("breakdownEnabled")
    document.getElementById("darkMode").innerHTML = getCookie("darkMode")
    document.getElementById("compLetters").innerHTML = getCookie("compLetters")
    document.getElementById("compColours").innerHTML = getCookie("compColours")
    document.getElementById("playerLetters").innerHTML = getCookie("playerLetters")
    document.getElementById("playerColours").innerHTML = getCookie("playerColours")
};

function updateFont(method){
    const fontSizes = ["0.5em", "0.6em", "0.7em", "0.8em", "0.9em", "1em", "1.5em", "2em", "2.5em", "3em"]

    // Remove units
    let currentSize = document.getElementById("displayFont").style.fontSize
    let currentIndex = fontSizes.indexOf(currentSize)
    console.log(currentSize)

    if (method === "reduce"){
        document.getElementById("displayFont").style.fontSize = fontSizes[currentIndex - 1]
    }
    else{
        document.getElementById("displayFont").style.fontSize = fontSizes[currentIndex + 1]
    }
}

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

function setCookie(setting, content){
    document.cookie = setting + " = " + content +  "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    document.getElementById(setting).innerHTML = content
}

function updateSetting(setting){
    document.cookie = "userMode = Custom; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";

    let status = getCookie(setting)

    if (status.toString() === "On"){
        setCookie(setting, "Off")
    }
    else{
        setCookie(setting, "On")
    }
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    // Find better solution
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    location.reload();
}