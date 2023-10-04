/**
 * @param {HTMLDialogElement} dialog
 */
function openDialog(dialog){
    dialog.showModal()
}

/**
 * @param {HTMLDialogElement | null} dialog
 */
function closeDialog(dialog = null){
    if (dialog) {
        dialog.close()
        return
    }

    document.querySelectorAll('dialog').forEach(d => d.close())
}

(() => {
    document.querySelectorAll('dialog').forEach(d => {
        d['onopen'] = () => {}
        new MutationObserver( recs => {
            recs.forEach( ({attributeName: attr, target: dial }) => {
                if (attr === 'open' && dial.open ) dial.onopen();
            })
        }).observe(d, { attributes: true })

        d.onopen = () => document.body.style.overflow = 'hidden'
        d.onclose = () => document.body.removeAttribute('style')
    })
})()