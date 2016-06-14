import React from "react"
import { render } from "react-dom"
import Cache from "./cache"
import Sidebar from "./sidebar"
import Profile from "./profile"

import { setupQuiz } from "./quiz"
import {
    setExternalHrefs,
    setStickyFooter,
    setAnchorsToHeaders,
    highlightNavigation,
    setSidebar,
    addLineNumberButton,
    addCodePenButton,
    addSpoilerButton
} from "./core"
import {
    byId,
    bySelector,
    getUrlParams
} from "./helpers"

const Location = window.location
Cache.refresh()

function main() {
    // Elements used to activate certain features
    const sidebar = byId("sidebar")
    const codeExamples = bySelector(".highlight")
    const spoilers = bySelector(".spoiler")
    const quiz = byId("quiz-container")
    const sidebarComponent = byId("app-sidebar")
    const profileComponent = byId("profile-container")

    // Common stuff
    setExternalHrefs()
    setStickyFooter()
    setAnchorsToHeaders()
    highlightNavigation()

    // Sidebar
    if (sidebar) {
        setSidebar()
    }
    // Code examples
    if (codeExamples.length) {
        codeExamples.map(e => {
            addLineNumberButton(e)
            addCodePenButton(e)
        })
    }
    // Spoilers
    if (spoilers.length) {
        spoilers.map(e => addSpoilerButton(e))
    }
    // Quiz
    if (quiz) {
        // TODO: create a proper react component for this
        setupQuiz()
    } 

    if (sidebarComponent) {
        render(<Sidebar />, sidebarComponent)
    }

    if (profileComponent) {
        render(<Profile />, profileComponent)
    }
}

window.addEventListener("load", function load() {
    window.removeEventListener("load", load, false);
    main();
}, false);
