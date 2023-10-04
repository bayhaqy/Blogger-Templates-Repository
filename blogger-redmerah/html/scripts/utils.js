// This is just a helper only. Only use when needed.

let
    elId = (elementId, parent = document) => parent.getElementById(elementId),
    elQuery = (selector, parent = document) => parent.querySelector(selector),
    elQueryAll = (selector, parent = document) => parent.querySelectorAll(selector),
    setAttr = (element, qualifiedName, value) => element.setAttribute(qualifiedName, value),
    getAttr = (element, qualifiedName) => element.getAttribute(qualifiedName),
    delAttr = (element, qualifiedName) => element.removeAttribute(qualifiedName),
    toggleAttr = (element, qualifiedName, force) => element.toggleAttribute(qualifiedName, force),
    setInnerEl = (element, value) => { element.innerHTML = value },
    getInnerEl = (element) => element.innerHTML,
    setOuterEl = (element, value) => { element.outerHTML = value },
    getOuterEl = (element) => element.outerHTML,
    showModal = (element) => element.showModal(),
    closeModal = (element) => element.close(),
    copyText = text => navigator.clipboard.writeText(text),
    addClass = (element, className) => element.classList.add(className),
    removeClass = (element, className) => element.classList.remove(className),
    isContainClass = (element, className) => element.classList.contains(className),
    appendChild = (element, child) => element.appendChild(child),
    setStyle = (element, style, value) => element.style[style] = value,
    h = (tagName, attr={children: []}) => {
        const e = document.createElement(tagName)
        for (const [key, value] of Object.entries(attr)){
            if (key == 'children'){
                setInnerEl(e, value.map(v => {
                    if (v instanceof Element) return getOuterEl(v)
                    else if (typeof v == 'string') return v
                    return ''
                }).join(''))
            } else setAttr(e, key, value)
        }
        return e
    }
;