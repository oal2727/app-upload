import cookie from "js-cookie"
export const getToken = ()=>{
    if(cookie.get('token')){
        return true;
    }
    return false;
}
export const setToken = (data) => {
    cookie.set('token',data)
}
export const deleteToken = ()=>{
    cookie.remove('token')
}