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