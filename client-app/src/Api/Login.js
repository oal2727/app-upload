import Api from './api'

export default {
    LoginSocial(social,data){
        return Api().post(`/${social}`,data)
    },
    Register(data){
        return Api().post('/register',data)
    },
    Login(data){
        return Api().post('/login',data)
    },
    Me(){
        return Api().get('/dashboard')
    }
}