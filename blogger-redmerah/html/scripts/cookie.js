/**
 * @param {string} key
 * @param {any} value
 * @param {{
 *   domain: string,
 *   expires: number,
 *   maxAge: number,
 *   path: string,
 *   sameSite: 'Lax' | 'Strict' | 'None',
 *   secure: boolean,
 *   httpOnly: boolean
 * } | null | undefined} options
 */
function setCookie(key, value, options = {sameSite: 'Lax', expires: 9999, path: '/'}) {
    let cookie = key + "=" + encodeURIComponent(value);

    if (options) {
        if (options.expires) {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            cookie += "; expires=" + expirationDate.toUTCString();
        }
        if (options.maxAge  ) cookie += "; max-age="    + options.maxAge;
        if (options.path    ) cookie += "; path="       + options.path;
        if (options.domain  ) cookie += "; domain="     + options.domain;
        if (options.sameSite) cookie += "; SameSite="   + options.sameSite;
        if (options.secure  ) cookie += "; secure";
        if (options.httpOnly) cookie += "; httpOnly";
    }

    document.cookie = cookie;
}

/**
 * @param {string} key
 */
function getCookie(key) {
    const cookieName = key + "=";
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length));
        }
    }

    return null;
}

(() => {
    if (getCookie('cookie-message') === 'shown') return
    const elId = (elementId, parent = document) => parent.getElementById(elementId)
    const cookieMessageEl = elId('_cookies-message')

    cookieMessageEl.removeAttribute('data-hide')
    elId('_cm-ok-btn').onclick = e => {
        setCookie('cookie-message', 'shown')
        cookieMessageEl.setAttribute('data-hide', '')
    }
})()