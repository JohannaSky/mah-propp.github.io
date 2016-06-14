// "Converts" a HTML NodeList to an array
export function toArray(nodes) {
    let a = []
    let l = nodes.length

    for (let i = 0; i < l; i++) {
        a.push(nodes[i])
    }

    return a
}

// Shuffle an array (http://stackoverflow.com/a/6274381)
export function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o
}

// Return an HTML element by id
export function byId(id) {
    return document.getElementById(id)
}

// Return an array of HTML elements by class
export function bySelector(cls) {
    return toArray(document.querySelectorAll(cls))
}

// Return an array of HTML elements by tagname
export function byTag(tag) {
    return toArray(document.getElementsByTagName(tag))
}

// Create a new HTML element
export function create(elm) {
    return document.createElement(elm)
}

// Check for a needle in a haystack with regexp
export function startsWith(needle, haystack) {
    return (new RegExp("^" + needle)).test(haystack)
}

// Shorthand for adding a click event to an element
export function click(elm, cb) {
    return elm.addEventListener("click", cb, false)
}

// Check for one of three languages (for codepen)
export function hasWebLang(lang) {
    let languages = [
        "css", "language-css",
        "html", "language-html",
        "js", "language-js"
    ]

    return Boolean(languages.indexOf(lang) > -1)
}

// Source: http://stackoverflow.com/a/2880929
export function getUrlParams(query) {
    let match
    // Regex for replacing addition symbol with a space
    let pl     = /\+/g
    let search = /([^&=]+)=?([^&]*)/g
    let decode = s => decodeURIComponent(s.replace(pl, " "))
    let urlParams = {}

    while ((match = search.exec(query))) {
        urlParams[decode(match[1])] = decode(match[2])
    }

    return urlParams
}
