(() => {
    let
        elId = (elementId, parent = document) => parent.getElementById(elementId),
        toggleAttr = (element, qualifiedName, force) => element.toggleAttribute(qualifiedName, force),
        yPosition = 0,
        fab = elId('_floating-action-btn'),
        topBar = elId('_top-bar')
    ;

    document.body.onscroll = ev => {
        const
            isGoingUp = yPosition > window.scrollY,
            isNotInTop = window.scrollY > 0
        ;

        toggleAttr(fab, 'data-show', isGoingUp && isNotInTop)
        toggleAttr(topBar, 'data-hide', !isGoingUp)
        closeAllMenu()
        yPosition = window.scrollY
    }

    fab.onclick = event => window.scrollTo({ top: 0, behavior: "smooth" })
})()