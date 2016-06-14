// Dependencies
import {
    toArray,
    shuffle,
    byId,
    bySelector,
    byTag,
    create,
    startsWith,
    click,
    hasWebLang
} from "./helpers"

const Location = window.location;

// Anchors with external hrefs gets target="_blank"
export function setExternalHrefs() {
    const anchors = byTag("a")
    const url = Location.protocol + "//" + Location.host

    return anchors
        .filter(a => !startsWith(url, a.href))
        .map(a => (a.target = "_blank"))
}

// Add anchors to content headers
export function setAnchorsToHeaders() {
    let headers = bySelector("#content h1, #content h2, #content h3")

    function appendAnchor(header) {
        let a = create("a")
        a.href = "#" + header.id
        a.className = "header-anchor"
        header.appendChild(a)
        return header
    }

    return headers
        .filter(h => h.id ? true : false)
        .map(appendAnchor)
}

// Sticky footer, sets min-height if content height isn't enough
export function setStickyFooter() {
    let content = byId("content")
    const wH = window.innerHeight
    const bH = document.body.clientHeight
    const cH = content.offsetHeight

    if (wH - bH > 0) {
        content.style.minHeight = (wH - (bH - cH)) + "px";
    }
}

// Sets the sidebar features for toggling visibility
export function setSidebar() {
    let sidebar = byId("sidebar")
    let header = byId("header")
    let sidebarButton = byId("toggle-sidebar")
    let courseElms = bySelector(".course-overview-element")
    let anchors = bySelector("#sidebar ul ul a")

    // Add the "fix-sidebar" class to the sidebar when scrolling
    window.addEventListener("scroll", () => {
        let top = document.scrollTop || document.body.scrollTop
        let cls = document.body.classList

        if (top > header.offsetHeight) {
            if (!cls.contains("fix-sidebar")) {
                cls.add("fix-sidebar");
            }
        } else {
            cls.remove("fix-sidebar");
        }
    }, false);

    // Toggle visibility of the sidebar
    click(sidebarButton, () => sidebar.classList.toggle("toggle"))
    // Toggle visibility of course elements (assignments, exercises, etc.)
    courseElms.map(el => click(el, e => e.target.classList.toggle("toggle")))
    // Add the "active" class to the current active sidebar navigation anchor
    anchors
        .filter(a => startsWith(a.href, Location.href))
        .map(a => {
            a.classList.add("active");
            // TODO: better solution for this...
            a.parentNode.parentNode.previousElementSibling.classList.add("toggle")
        })
}

// Add the "current" class to the current navigation anchor
export function highlightNavigation() {
    let anchors = bySelector(".navigation li a")

    // Filter out exact matches
    let found = anchors
            .filter(a => a.href == Location.href.replace(/\+$/, ""))
            .map(a => a.classList.add("current"))

    // If no was found use the starting pathname instead
    if (!found.length) {
        anchors
            .filter(a => startsWith(a.href, Location.href))
            .map(a => a.classList.add("current"))
    }
}

// Creates a button that toggles line numbers in code examples
export function createLineNumberButton() {
    let btn = create("button")
    let txt = document.createTextNode("radnummer")
    let show = create("span")
    let hide = create("span")

    btn.className = "toggle-lineno"
    btn.type = "button"
    show.className = "show"
    show.textContent = "Visa "
    hide.className = "hide"
    hide.textContent = "Dölj "

    btn.appendChild(show)
    btn.appendChild(hide)
    btn.appendChild(txt)

    return btn
}

// Add the button that toggles line numbers to a code example
export function addLineNumberButton(element) {
    // Only add a line number button if the code examples has line numbers
    if (element.firstChild.firstChild.childNodes[0].className != "lineno") {
        return
    }

    let btn = createLineNumberButton()
    click(btn, () => btn.parentElement.classList.toggle("toggle"))
    element.appendChild(btn)

    return
}

// Serialize contents of a code example
export function serializeCode(element) {
    let code = element.firstChild.firstChild
    let lang = code.className
    let data = {}

    let content = toArray(code.childNodes)
            .filter(n => n.className == "lineno" ? false : true)
            .reduce((p, c) => p + c.textContent, "")

    data[lang.substr(9)] = content
    data["title"] = "Code Example"
    return data
}

// Sends contents of a code example to CodePen
export function submitToCodePen(element) {
    let data = serializeCode(element)

    if (!data) {
        return
    }

    let form = create("form")
    let input = create("input")
    let json = JSON.stringify(data)
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;")

    input.setAttribute("type", "hidden")
    input.setAttribute("name", "data")
    input.setAttribute("value", json)
    form.setAttribute("method", "post")
    form.setAttribute("action", "http://codepen.io/pen/define")
    form.setAttribute("target", "_blank")
    form.appendChild(input)
    document.body.appendChild(form)

    return form.submit()
}

// Adds a button that sends the code to CodePen to a code example
export function addCodePenButton(element) {
    let lang = element.firstChild.firstChild.className

    if (!hasWebLang(lang)) {
        return false
    }

    let btn = create("button")
    btn.textContent = "Öppna i CodePen"
    btn.className = "codepen-button"
    btn.type = "button"

    click(btn, () => submitToCodePen(btn.parentElement))

    return element.appendChild(btn)
}

// Create the button to show/hide spoiler text
export function createSpoilerButton(element) {
    let btn = create("button")
    btn.type = "button"
    btn.className = "show-spoiler"
    btn.textContent = "Visa svar"

    // Toggle visibility with classes
    click(btn, () => {
        if (btn.className == "show-spoiler") {
            element.className = "spoiler show"
            btn.className = "hide-spoiler"
            btn.textContent = "Dölj svar"
        } else {
            element.className = "spoiler"
            btn.className = "show-spoiler"
            btn.textContent = "Visa svar"
        }
    });

    return btn
}

// Add a spoiler button to an element
export function addSpoilerButton(element) {
    const btn = createSpoilerButton(element)
    element.parentNode.insertBefore(btn, element.nextSibling)
}
