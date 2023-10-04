(() => {
    const
        elId = (elementId, parent = document) => parent.getElementById(elementId),
        elQuery = (selector, parent = document) => parent.querySelector(selector),
        setAttr = (element, qualifiedName, value) => element.setAttribute(qualifiedName, value),
        delAttr = (element, qualifiedName) => element.removeAttribute(qualifiedName),
        addClass = (element, className) => element.classList.add(className),
        removeClass = (element, className) => element.classList.remove(className),
        systemStr = 'system',
        darkStr = 'dark',
        lightStr = 'light',
        themeStr = 'theme',
        dataSelectedStr = 'data-selected',
        themeBtn = theme => elQuery(`#_theme-menu [data-theme="${theme}"]`),
        root = elQuery(":root"),
        topBar = elQuery('#_top-bar>div'),
        setTheme = (theme) => {
            removeClass(root, systemStr)
            removeClass(root, darkStr)
            removeClass(root, lightStr)
            addClass(root, theme)
            delAttr(themeBtn(systemStr), dataSelectedStr)
            delAttr(themeBtn(darkStr), dataSelectedStr)
            delAttr(themeBtn(lightStr), dataSelectedStr)
            setAttr(themeBtn(theme), dataSelectedStr, '')
            setCookie(themeStr, theme)
            closeAllMenu()
        }
    ;

    switch (getCookie(themeStr)){
        case darkStr: setTheme(darkStr); break
        case lightStr: setTheme(lightStr); break
        default: setTheme(systemStr)
    }
    themeBtn(systemStr).onclick = _ => setTheme(systemStr)
    themeBtn(darkStr).onclick = _ => setTheme(darkStr)
    themeBtn(lightStr).onclick = _ => setTheme(lightStr)
    elId('_tb-theme-btn').onclick = e => openMenu(e, elId('_theme-menu'))
    elId('_tb-search-btn').onclick = e => setAttr(topBar, 'data-search', '')
    elId('_tb-close-btn').onclick = e => delAttr(topBar, 'data-search')
    elId('_tb-menu-btn').onclick = e => openMenu(e, elId('_nav-menu'))
})()