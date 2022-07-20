const USER = "usr"

export const writeCookie = (cookie, data) => {
    return cookie.set(USER, data)
}

export const readCookie = (cookie) => {
    return cookie.get(USER)
}

export const deleteCookie = (cookie) => {
    return cookie.remove(USER)
}