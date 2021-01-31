import React from "react"
import "./style.css"
import Image from "../../Api/Images"
import {UserContext} from "../../context/UserContext"
import { format } from 'timeago.js';

 
const CardPhotos = ({title,image,id,created_at}) =>{

  const {dispatch} = React.useContext(UserContext)
  const deletePhoto =(id)=>{
    Image.deleteImage(id).then(response => {
        dispatch({type:"DELETE_IMAGEN",payload:response.data._id})
    })
  }

    return(


  <div className="card-image">
        <img className="image_card" src={image} alt="" />
        <div className="box-trash" onClick={()=>deletePhoto(id)}>
          <i id="trash_icon"  className="fas fa-trash"></i>
        </div>
        <div className="card-image-body">
          <p className="time_upload">{format(created_at)}</p>
          <span className="title_card">{title}</span>
        </div>
      </div>
    )   
}
export default CardPhotos