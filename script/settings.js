// Take user to destination page
function redirect(dest){
    location.href = dest + ".html";
}

// If the mode and streak cookies don't exist yet, create them with default values
window.onload = function settingsInit(){
    // Retrieve all settings
    try {
        let settings = [JSON.parse(getCookie("gameSettings")), JSON.parse(getCookie("displaySettings")),
            JSON.parse(getCookie("otherSettings"))]

        // Go through all settings and update the page
        for(let i = 0; i < settings.length; i++) {
            for (let [setting, value] of Object.entries(settings[i])) {
                // Display font is a style change not an innerHTML change
                if (setting === "displayFont") {
                    document.getElementById(setting).style.fontSize = value.toString();
                } else {
                    document.getElementById(setting).innerHTML = value.toString();
                }
            }
        }
    }
    catch{
        if (!getCookie("reset")){
            alert("You are being redirected as you are missing essential cookies.");
        }
        redirect("home");
    }
};

function updateFont(method){
    const fontSizes = ["0.5em", "0.6em", "0.7em", "0.8em", "0.9em", "1em", "1.5em", "2em", "2.5em", "3em"];

    let currentSize = document.getElementById("displayFont").style.fontSize;
    let currentIndex = fontSizes.indexOf(currentSize);

    if (method === "reduce"){
        document.getElementById("displayFont").style.fontSize = fontSizes[currentIndex - 1]
    }
    else{
        document.getElementById("displayFont").style.fontSize = fontSizes[currentIndex + 1]
    }
}

// Given a cookie name get its value
function getCookie(cname) {
    return document.cookie.match('(^|;)\\s*' + cname + '\\s*=\\s*([^;]+)')?.pop() || '';
}

function setCookie(setting, content){
    document.cookie = setting + " = " + content +  "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
}

function updateSetting(type, setting){
    let contents = JSON.parse(getCookie(type));

    // Changing any difficulty settings means custom difficulty enabled
    if (type === "difficulty"){
        document.cookie = "userMode = Custom; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";
    }
    // Get relevant setting status and update contents
    if (contents[setting].toString() === "On"){
        contents[setting] = "Off";
    }
    else{
        contents[setting] = "On";
    }
    // Apply content changes to cookie
    setCookie(type, JSON.stringify(contents));
    // Update relevant element with new content
    document.getElementById(setting).innerHTML = contents[setting]
}

function resetSettings(){
    document.cookie = "gameSettings =reset;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "displaySettings =;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "otherSettings =;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Flag to redirect back to settings
    document.cookie = "reset = " + true +  "; expires=Fri, 31 Dec 9999 23:59:59 GMT\"";

    location.reload();
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    // Find better solution
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    location.reload();
}