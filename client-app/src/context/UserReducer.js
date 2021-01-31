export const UserReducer =(state,action)=>{
    switch(action.type){
        case "TOOGLE_AUTHENTICATED":
            return{
                ...state,
                authenticated:action.payload
            }
        case "USER_AUTHENTICATED":
            return{
                ...state,
                userAuthneticated:{
                    firstName:action.payload.firstName,
                    lastName:action.payload.lastName,
                    email:action.payload.email,
                    id:action.payload._id
                }
        }
        case "TOOGLE_SPINNER":
            return{
                ...state,spinner:action.payload
            }
       case "SET_IMAGES":
            return{
                ...state,imagenes:action.payload
            }
        case "DELETE_IMAGEN":
            const arrayData = state.imagenes.filter(item => {
                return item._id !== action.payload
            })
            return{
                ...state,
                imagenes:arrayData
            }
        case "ADD_IMAGEN":
            return{
                ...state,
                imagenes:[
                    ...state.imagenes,
                    action.payload
                ]
            }
        default:
            return state;
    }
}