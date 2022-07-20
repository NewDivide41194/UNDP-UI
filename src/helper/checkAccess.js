import { deleteCookie } from "./cookieUser"

export const checkTokenExist = (user, history, cookie) => {
    if (user === undefined || user === null || user.token === undefined || user.token === null) {
        deleteCookie(cookie)
        history.replace('/login')
        return false
    } else return true
}