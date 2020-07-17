/*
 * Modified from: https://dev.to/dcodeyt/add-dark-mode-to-your-websites-with-css-5bh4
 * Needs a HTML DOM element with a #theme id 
 */
"use strict";

function applyTheme(theme) {
    console.warn(`Applying ${theme} theme`);
    document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
    let icon = $('.theme-icon')[0];
    icon.classList.remove("lni-sun", "lni-night");
    icon.classList.add(theme === "light" ? "lni-sun" : "lni-night");
    let toggle = $('#theme')[0].checked = theme !== "light"; 
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";

    applyTheme(savedTheme);

    document.querySelector("#theme").addEventListener("change", function () {
        let theme = $('#theme')[0].checked ? "dark" : "light"
        localStorage.setItem("theme", theme);
        applyTheme(theme);
    });
});
