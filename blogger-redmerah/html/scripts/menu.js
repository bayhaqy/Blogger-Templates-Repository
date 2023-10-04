/**
 * @param {Event} event
 * @param {HTMLMenuElement} menu
 */
function openMenu(event, menu){
    const
        setStyle = (element, style, value) => element.style[style] = value,
        getAttr = (element, qualifiedName) => element.getAttribute(qualifiedName)
    ;

    if (document.querySelector('menu[data-open]')){
        return
    }

    event.stopPropagation()
    menu.setAttribute('data-open', '')
    menu.removeAttribute('style')

    const
        ELEMENT_RECT = event.currentTarget.getBoundingClientRect(),
        MENU_RECT = menu.getBoundingClientRect(),
        MARGIN = 8,
        GAP = Number.parseFloat(getAttr(menu, 'data-gap')) ?? 8,
        SCREEN_WIDTH = document.body.clientWidth,
        SCREEN_HEIGHT = window.innerHeight
    ;

    let
        top = 0,
        left = 0,
        right = 0,
        bottom = 0,
        width = MENU_RECT.width,
        height = MENU_RECT.height,
        maxWidth,
        maxHeight
    ;

    if (SCREEN_WIDTH - MARGIN * 2 < width){
        maxWidth = SCREEN_WIDTH - MARGIN * 2
        width = maxWidth
    }
    if (SCREEN_HEIGHT - MARGIN * 2 < height){
        maxHeight = SCREEN_HEIGHT - MARGIN * 2
        height = maxHeight
    }

    switch (getAttr(menu, 'data-position')){
        case 'top-left':
            top = ELEMENT_RECT.top - height - GAP
            if (top < MARGIN) top = MARGIN

            left = ELEMENT_RECT.left
            right = SCREEN_WIDTH - left - width
            if (right < MARGIN) left = SCREEN_WIDTH - width - MARGIN
            break
        case 'top-right':
            top = ELEMENT_RECT.top - height - GAP
            if (top < MARGIN) top = MARGIN

            left = ELEMENT_RECT.right - width
            if (left < MARGIN) left = MARGIN
            break
        case 'top-center':
            top = ELEMENT_RECT.top - height - GAP
            if (top < MARGIN) top = MARGIN

            left = ELEMENT_RECT.left - width / 2 + ELEMENT_RECT.width / 2
            right = SCREEN_WIDTH - left - width
            if (left < MARGIN) left = MARGIN
            if (right < MARGIN) left = SCREEN_WIDTH - width - MARGIN
            break
        case 'bottom-left':
            top = ELEMENT_RECT.bottom + GAP
            bottom = SCREEN_HEIGHT - top - height
            if (bottom < MARGIN) top = SCREEN_HEIGHT - height - MARGIN

            left = ELEMENT_RECT.left
            right = SCREEN_WIDTH - left - width
            if (right < MARGIN) left = SCREEN_WIDTH - width - MARGIN
            break
        case 'bottom-right':
            top = ELEMENT_RECT.bottom + GAP
            bottom = SCREEN_HEIGHT - top - height
            if (bottom < MARGIN) top = SCREEN_HEIGHT - height - MARGIN

            left = ELEMENT_RECT.right - width
            if (left < MARGIN) left = MARGIN
            break
        case 'bottom-center':
            top = ELEMENT_RECT.bottom + GAP
            bottom = SCREEN_HEIGHT - top - height
            if (bottom < MARGIN) top = SCREEN_HEIGHT - height - MARGIN

            left = ELEMENT_RECT.left - width / 2 + ELEMENT_RECT.width / 2
            right = SCREEN_WIDTH - left - width
            if (left < MARGIN) left = MARGIN
            if (right < MARGIN) left = SCREEN_WIDTH - width - MARGIN
            break
        case 'left-top':
            top = ELEMENT_RECT.top
            bottom = SCREEN_HEIGHT - top - height
            if (bottom < MARGIN) top = SCREEN_HEIGHT - height - MARGIN

            left = ELEMENT_RECT.left - width - GAP
            if (left < MARGIN) left = MARGIN
            break
        case 'left-bottom':
            top = ELEMENT_RECT.bottom - height
            if (top < MARGIN) top = MARGIN

            left = ELEMENT_RECT.left - width - GAP
            if (left < MARGIN) left = MARGIN
            break
        case 'left-center':
            top = ELEMENT_RECT.top - height / 2 + ELEMENT_RECT.height / 2
            bottom = SCREEN_HEIGHT - top - height
            if (top < MARGIN) top = MARGIN
            if (bottom < MARGIN) top = SCREEN_HEIGHT - height - MARGIN

            left = ELEMENT_RECT.left - width - GAP
            if (left < MARGIN) left = MARGIN
            break
        case 'right-top':
            top = ELEMENT_RECT.top
            bottom = SCREEN_HEIGHT - top - height
            if (bottom < MARGIN) top = SCREEN_HEIGHT - height - MARGIN

            left = ELEMENT_RECT.right + GAP
            right = SCREEN_WIDTH - left - width
            if (right < MARGIN) left = SCREEN_WIDTH - width - MARGIN
            break
        case 'right-bottom':
            top = ELEMENT_RECT.bottom - height
            if (top < MARGIN) top = MARGIN

            left = ELEMENT_RECT.right + GAP
            right = SCREEN_WIDTH - left - width
            if (right < MARGIN) left = SCREEN_WIDTH - width - MARGIN
            break
        case 'right-center':
            top = ELEMENT_RECT.top - height / 2 + ELEMENT_RECT.height / 2
            bottom = SCREEN_HEIGHT - top - height
            if (top < MARGIN) top = MARGIN
            if (bottom < MARGIN) top = SCREEN_HEIGHT - height - MARGIN

            left = ELEMENT_RECT.right + GAP
            right = SCREEN_WIDTH - left - width
            if (right < MARGIN) left = SCREEN_WIDTH - width - MARGIN
            break
        default: // bottom-center
            top = ELEMENT_RECT.bottom + GAP
            bottom = SCREEN_HEIGHT - top - height
            if (bottom < MARGIN) top = SCREEN_HEIGHT - height - MARGIN

            left = ELEMENT_RECT.left - width / 2 + ELEMENT_RECT.width / 2
            right = SCREEN_WIDTH - left - width
            if (left < MARGIN) left = MARGIN
            if (right < MARGIN) left = SCREEN_WIDTH - width - MARGIN
    }

    if (maxWidth) setStyle(menu, 'maxWidth', maxWidth + 'px')
    if (maxHeight) setStyle(menu, 'maxHeight', maxHeight + 'px')
    setStyle(menu, 'top', top + 'px')
    setStyle(menu, 'left', left + 'px')
}

function closeAllMenu(){
    for (const menu of document.querySelectorAll('menu[data-open]')){
        menu.removeAttribute('data-open')
    }
}

(() => {
    window.onclick = event => closeAllMenu()

    for (const menu of document.querySelectorAll('menu')){
        menu.onclick = event => event.stopPropagation()
    }
})()