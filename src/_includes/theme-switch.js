function calculateSettingsAsThemeString(localStorageTheme) {
    if (localStorageTheme === null) {
      return "dark";
    }
    return localStorageTheme;
}


const localStorageTheme = localStorage.getItem("theme")
let currentTheme = calculateSettingsAsThemeString(localStorageTheme)
console.log("Selected theme : " + currentTheme)


window.onload = function () {
    themeOnPageLaod = document.querySelector("html").getAttribute("data-theme")
    console.log("Theme on page load: " + themeOnPageLaod)
    if (themeOnPageLaod !== currentTheme){
        console.log("Changing theme to " + currentTheme)
        document.querySelector("html").setAttribute("data-theme", currentTheme)
    }
}


document.querySelector(".theme-icon").addEventListener("click", () => {
    myFunction()

});

function myFunction() {
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    console.log("Current theme:" + currentTheme)
    console.log("Switching theme to " + newTheme);

    document.querySelector("html").setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    currentTheme = newTheme
} 