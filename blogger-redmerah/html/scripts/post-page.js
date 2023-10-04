(() => {
    let
        elId = (elementId, parent = document) => parent.getElementById(elementId),
        elQuery = (selector, parent = document) => parent.querySelector(selector),
        elQueryAll = (selector, parent = document) => parent.querySelectorAll(selector),
        setAttr = (element, qualifiedName, value) => element.setAttribute(qualifiedName, value),
        getAttr = (element, qualifiedName) => element.getAttribute(qualifiedName),
        setInnerEl = (element, value) => { element.innerHTML = value },
        setOuterEl = (element, value) => { element.outerHTML = value },
        getOuterEl = (element) => element.outerHTML,
        copyText = text => navigator.clipboard.writeText(text),
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
        },
        copyLinkBtn = elId('_pp-sd-copy-btn'),
        shareBtn = elId('_pp-sd-share-btn'),
        copyLinkTimeoutId = null,
        shareTimeoutId = null,
        tableOfContents = [],
        tableOfContentsDialog = elId('_pp-toc-dialog'),
        shareDialog = elId('_pp-share-dialog'),
        commentsDialog = elId('_pp-comments-dialog'),
        headers = elQueryAll('.pp-content :is(h1,h2,h3,h4)'),
        icon = name => h('span', {children: [name], translate: 'no', class: 'icon'})
    ;

    for (const a of elQueryAll('.pp-content a')){
        if (!getAttr(a, 'title') && a.textContent.trim() != getAttr(a, 'href')){
            setAttr(a, 'title', getAttr(a, 'href'))
            setAttr(a, 'data-tooltip-position', 'bottom-left')
        }

        if (!getAttr(a, 'href').startsWith('#')){
            setAttr(a, 'target', '_blank')
            setAttr(a, 'rel', 'noopener noreferrer')
        }
    }

    for (const img of elQueryAll('.pp-content img')){
        img.onclick = e => window.open(img.src, '_blank')
    }

    for (const table of elQueryAll('.pp-content table')){
        setOuterEl(table, getOuterEl(h('div', {class: 'pp-c-table', children: [table]})));
    }

    for (const header of headers){
        const
            text = header.textContent,
            id = text.toLowerCase().replace(/\s/gsm, '-').replace(/[^\w-]/gsm, ''),
            headerTagname = header.tagName.toLowerCase()
        ;

        setAttr(header, 'id', id)
        setInnerEl(header, text)

        tableOfContents.push(h('a', {
            'data-toc': headerTagname,
            href: '#' + id,
            children: [
                icon((() => { switch (headerTagname){
                    case 'h3': return 'line_start_square'
                    case 'h4': return 'line_start_arrow'
                    default  : return 'line_start_circle'
                }})()),
                text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            ]
        }))

        header.onclick = e => location.href = '#' + id
    }

    if (headers.length > 0) elQuery('.pp-tocd-body').innerHTML += tableOfContents.map(e => getOuterEl(e)).join('')
    else elId('_pp-a-toc-btn').style.display = 'none'

    for (const a of elQueryAll('.pp-tocd-body>a')){
        a.onclick = ev => closeDialog()
    }

    for (const pre of elQueryAll('.pp-content pre')){
        /**
        <div class="pp-c-pre">
            <div>
                <code>{{ filename | language }}</code>
                <button title="Salin"><span class="icon" translate="no">{{ "content_copy" | "done" }}</span></button>
            </div>
            <pre><code>{{ code }}</code></pre>
        </div>
        */
        const code = elQuery('code', pre)
        let filename = 'Plain text'

        const t = (getAttr(code, 'class') ?? '').match(/(?<=language-)[^\s]+/gms)
        if (t != null){
            filename = t[0].substring(0,1).toUpperCase() + t[0].substring(1)
        }
        if (getAttr(code, 'data-filename')){
            filename = getAttr(code, 'data-filename')
        }
        setOuterEl(pre, getOuterEl(h('div', {class: 'pp-c-pre', children: [
            h('div', {children: [
                h('code', {children: [filename]}),
                h('button', {children: [icon('content_copy')], title: "Salin", 'data-tooltip-position': 'left-center'})
            ]}),
            pre
        ]})))
    }

    for (const precode of elQueryAll('.pp-c-pre')){
        const button = elQuery('button', precode)
        const icon = elQuery('.icon', precode)
        const text = elQuery('pre>code', precode).textContent
        let copyLinkTimeoutId = null

        if (copyLinkTimeoutId) clearTimeout(copyLinkTimeoutId)
        button.onclick = ev => copyText(text).then(v => {
            setInnerEl(icon, 'done')
            setAttr(button, 'data-tooltip', 'Tersalin')
            copyLinkTimeoutId = setTimeout(() => {
                setAttr(button, 'data-tooltip', 'Salin')
                setInnerEl(icon, 'content_copy')
            }, 3E3);
        })
    }

    elId('_pp-a-comments-btn').onclick = e => openDialog(commentsDialog)
    elId('_pp-ai-comments-btn').onclick = e => openDialog(commentsDialog)
    elId('_pp-cd-close-btn').onclick = e => closeDialog(commentsDialog)
    elId('_pp-a-toc-btn').onclick = e => openDialog(tableOfContentsDialog)
    elId('_pp-tocd-close-btn').onclick = e => closeDialog(tableOfContentsDialog)
    elId('_pp-sd-close-btn').onclick = e => closeDialog(shareDialog)
    elId('_pp-a-share-btn').onclick = e => openDialog(shareDialog)
    elId('_pp-ai-share-btn').onclick = e => openDialog(shareDialog)
    shareBtn.onclick = async (e) => {
        if (shareTimeoutId) return
        try {
            await navigator.share({url: getAttr(shareBtn, 'data-url'), title: getAttr(shareBtn, 'data-title')})
        } catch (e) {
            setInnerEl(shareBtn, '<div>' + getOuterEl(icon('error')) + 'Error</div>')
            shareTimeoutId = setTimeout(() => {
                setInnerEl(shareBtn, '<div>' + getOuterEl(icon('more_horiz')) + 'Lainnya</div>')
                shareTimeoutId = null
            }, 3E3);
        }
    }
    copyLinkBtn.onclick = ev => {
        if (copyLinkTimeoutId) return;

        copyText(getAttr(copyLinkBtn, 'data-url')).then(_ => {
            let ic = icon('done');
            setInnerEl(copyLinkBtn, '<div>' + getOuterEl(ic) + ' Tersalin</div>');
            copyLinkTimeoutId = setTimeout(() => {
                setInnerEl(ic, 'content_copy');
                setInnerEl(copyLinkBtn, '<div>' + getOuterEl(ic) + ' Salin link</div>');
                copyLinkTimeoutId = null;
            }, 2E3);
        });
    }
})()