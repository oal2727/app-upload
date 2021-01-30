const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require('body-parser')
const path = require("path");
//use enviroments globals
require('dotenv').config()

//enable cors
app.use(cors())
//checkout http code
app.use(morgan("dev"))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 4000

require("./database.js")


app.use('/api',require("./controller/ControllerUser.js"))
app.use('/api',require("./controller/ControllerImage.js"))

//
// if(process.env.NODE_ENV === 'production'){
app.use(express.static("../client/build"));
app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'../client/build/index.html'));
});
// }


// console.log(__dirname,"../client");
// const patss = path.resolve(__dirname,"../client")
app.listen(port,()=>{
	console.log(`App initialize on port : ${port}`)
})
