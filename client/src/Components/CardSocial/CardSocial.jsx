import React from "react"
import Card from 'react-bootstrap/Card';
const CardSocial= ({children})=>{
    return(
      <div style={{marginTop:30}}>
  <Card className="card_social">
       <Card.Body>
        {children}
      </Card.Body>
    </Card>
    </div>
    )

}
export default CardSocial;