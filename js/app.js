(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var selected_company = null;

function deselect_companies() {
    $('#companies > *').css('border-style', '');
    selected_company = null;
    let info = document.getElementById('companyInfo');
    info.style.visibility = 'hidden';
    info.setAttribute('data-target', null);
}

function select_company(name) {
    let obj = document.getElementById(name);
    let css = obj.style;
    if (selected_company !== name) {
        deselect_companies();
    }
    if (css.borderStyle === 'solid') {
        css.borderStyle = 'none';
        selected_company = null;
    } else {
        css.borderStyle = 'solid';
        selected_company = name;
        let info = document.getElementById('companyInfo');
        info.style.visibility = 'visible';
        info.setAttribute('data-target', '#company_modal_' + name);
    }
    if (selected_company === null) {
        deselect_companies();
    }

    return obj
}

// workaround for browserify sandboxing namespaces
window.select_company = select_company;
window.deselect_companies = deselect_companies;
},{}]},{},[1])
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])