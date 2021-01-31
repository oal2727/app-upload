import React,{useEffect} from "react"
import CardSocial from "../Components/CardSocial/CardSocial"
import {UserContext} from "../context/UserContext"
import ButtonComponent from "../Components/Button/ButtonComponent"
import FormInput from "../Components/Forms/FormInput"
import { useForm } from "react-hook-form";
import Images from "../Api/Images"
import CardPhotos from "../Components/CardPhotos/CardPhotos"
import UploadImage from "../upload_image.png"
import {  toast } from 'react-toastify';
const Dashboard = ()=>{
    const {state,dispatch} = React.useContext(UserContext)
    const [imagen,setImagen] = React.useState(null)
    const [file,setFile] = React.useState(null);
    const {register,handleSubmit,errors,reset } = useForm();
    useEffect(()=>{
        const getPhotos = ()=>{    
            Images.getImages().then(response => {
                dispatch({type:"SET_IMAGES",payload:response.data})
            })
        }
        getPhotos();
    },[])
    const refContainer = React.useRef(); //reference for image
    const fileUploadAction =()=>{
        refContainer.current.click()
    }
    const fileUploadInputChange = (e)=>{
        const file = e.target.files[0]
        setFile(file)
        const filereader = new FileReader()
        filereader.onload = (e)=>{
                setImagen(e.target.result)
        }
        filereader.readAsDataURL(file)
    }
    const onSubmit = (data,e) =>{
        if(file === null){
            return toast.error("No hay archivo integrado")
        }
        if(file.type !== "image/jpeg"){
            return  toast.error("Solo se permite imagenes con extension jpeg")
        }
        if(file.size <= 20000){
            return  toast.error("Solo se permite imagenes con extension jpeg")
        }
        else{
            const formData = new FormData();
            reset();
            formData.append('image',file)
            formData.append('title',data.title)
            Images.addImage(formData).then(response => {
                dispatch({type:"ADD_IMAGEN",payload:response.data})
                setImagen(null)
                setFile(null)
                e.target.reset(); 
            })
          }
    }
    return(
        <div>
         <CardSocial>
            <div className="box_social"> 
            <div className="box-image">
            {
                    imagen === null ? 
                    <img
                    className="image"
                     src={UploadImage} alt=""/>
                    :
                      <img 
                    className="image"
                        src={imagen} alt=""/>
            }
            <i id="camera_image"  onClick={fileUploadAction}   className="fas fa-camera"></i>
            <input type="file" 
            ref={refContainer} 
            onChange={fileUploadInputChange} 
            name="imagen"
            style={{display:"none"}}
             />
           
            </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput 
              label={"Title Image"}
              register={register}  
              name={"title"}
              placeholder="Input Title for Image" 
              type="text"

              required
             />
              <div>
              <p className="text-danger"> {errors.title && "*Title  is required"}</p>
              </div>
            <div>
            <ButtonComponent type="submit"  variant="success">Save</ButtonComponent>
        </div>
                </form>
            </div>
        </CardSocial>
        <div className="box-grid">
        {
            state.imagenes.map((item,index)=>{
                return(
                    <CardPhotos 
                    key={index}
                    title={item.title} 
                    id={item._id}
                    created_at={item.createdAt}
                    image={item.imageUrl}/>                )
            })
        }
        </div>
    </div>

    )
}

export default Dashboard;