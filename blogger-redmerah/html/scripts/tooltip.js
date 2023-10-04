(() => {
    for (const element of document.querySelectorAll('[title]')){
        let timeoutId
        const
            setStyle = (element, style, value) => element.style[style] = value,
            setAttr = (element, qualifiedName, value) => element.setAttribute(qualifiedName, value),
            getAttr = (element, qualifiedName) => element.getAttribute(qualifiedName),
            delAttr = (element, qualifiedName) => element.removeAttribute(qualifiedName),
            tooltipText = element.getAttribute('title'),
            tooltip = document.getElementById('_tooltip'),
            showTooltip = tooltipText => {
                if (timeoutId) clearTimeout(timeoutId)
                delAttr(tooltip, 'data-open')
                timeoutId = setTimeout(() => {
                    tooltip.innerHTML = tooltipText
                    setAttr(tooltip, 'data-open', '')
                    delAttr(tooltip, 'style')
                    const
                        ELEMENT_RECT = element.getBoundingClientRect(),
                        TOOLTIP_RECT = tooltip.getBoundingClientRect(),
                        MARGIN = 8,
                        GAP = 8,
                        SCREEN_WIDTH = document.body.clientWidth,
                        SCREEN_HEIGHT = window.innerHeight
                    ;
                    let
                        top = 0,
                        left = 0,
                        right = 0,
                        bottom = 0,
                        width = TOOLTIP_RECT.width,
                        height = TOOLTIP_RECT.height,
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

                    switch (getAttr(element, 'data-tooltip-position')){
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

                    if (maxWidth) setStyle(tooltip, 'maxWidth', maxWidth + 'px')
                    if (maxHeight) setStyle(tooltip, 'maxHeight', maxHeight + 'px')
                    setStyle(tooltip, 'top', top + 'px')
                    setStyle(tooltip, 'left', left + 'px')
                    timeoutId = null
                }, 5E2)
            },
            closeTooltip = e => {
                if (timeoutId) clearTimeout(timeoutId)
                delAttr(tooltip, 'data-open')
            }
        ;
        delAttr(element, 'title')
        setAttr(element, 'data-tooltip', tooltipText)
        if (window.matchMedia('(hover:hover)').matches){
            element.onmouseover = () => showTooltip(getAttr(element, 'data-tooltip'))
            element.onmouseout = closeTooltip
        } else {
            element.ontouchstart = () => showTooltip(getAttr(element, 'data-tooltip'))
            element.ontouchend = closeTooltip
            element.ontouchcancel = closeTooltip
        }
    }
})()