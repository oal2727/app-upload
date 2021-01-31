import Api from './api'

export default {
    getImages(){
        return Api().get(`/image`)
    },
    addImage(data){
        return Api().post('/sendimage',data)
    },
    deleteImage(idimagen){
        return Api().delete(`/image/${idimagen}`)
    }
}