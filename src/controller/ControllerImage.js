const express = require("express")
const router = express.Router()
const path = require('path');
const cloudinary = require("cloudinary");
const Imagen = require("../models/Image.js")
const {verifyToken} = require("../middleware/auth.js")
const fs = require('fs') 
const uuid = require('uuid').v4
const multer = require('multer');


var storage = multer.diskStorage({
 	destination: '../../../public/uploads/',
   filename:  (req, file, cb) => {
        cb(null, uuid()+ path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage }).single('image');
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: 'FjkPO_r-0Iv13YMwlN2bzvjFnGg' 
})



router.post('/sendimage',verifyToken,upload,async(req,res)=>{
	try{
		const usuarioid = req.id; //get id user
		const result = await cloudinary.v2.uploader.upload(req.file.path)
		if(result){
			console.log("file sucessfull")
			const imagen= new Imagen()
			imagen.imageUrl=result.secure_url;
			imagen.public_id=result.public_id;
			imagen.title=req.body.title
			imagen.id_user=usuarioid;
			const response = await imagen.save();
			if(response){
				return res.status(200).json(response)
				fs.unlink(req.file.path)
			}else{
				return res.status(400).json("problem send")
			}
		}else{
			return res.status(400).json("problm send on cloudinary")
		}
	}catch(err){
		return res.status(400).json(err)
	}
})
router.delete('/image/:id',verifyToken,async(req,res)=>{
	const {id} = req.params
	const response = await Imagen.findByIdAndDelete(id);
	if(response){
		cloudinary.uploader.destroy(response.public_id,function(){
			return res.status(200).json(response)
		})
	}else{
		return res.status(400).json(id)
	}
})

router.get('/image',verifyToken,async(req,res)=>{
	const usuarioid = req.id; //get id user
	const images = await Imagen.find({id_user:usuarioid})
	return res.status(200).json(images)
})

module.exports = router;