import React from "react"
import Button from 'react-bootstrap/Button';

const ButtonComponent = ({type,variant,children,onClick})=>{
    return(
        <Button type={type} onClick={onClick} style={{display:"flex",margin:"auto"}} variant={variant}>{children}</Button>
    )
}
export default ButtonComponent;