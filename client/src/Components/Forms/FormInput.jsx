import React from "react"
import Form from 'react-bootstrap/Form';

const FormInput = ({type,placeholder,register,required,label,name}) =>{
    return(
        <Form.Group style={{marginTop:10}}>
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} 
        name={name}
        ref={register({required})}
        placeholder={placeholder} />
  </Form.Group>
    )
}
export default FormInput;