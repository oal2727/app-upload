const express = require("express")
const router = express.Router()
const {OAuth2Client} = require('google-auth-library');
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const {verifyToken} = require("../middleware/auth.js")
const fetch = require('node-fetch');

const salt_rounds = 10 
//my first project
const client = new OAuth2Client(process.env.API_AUDENCE_GOOGLE)


//google auth sucessfull
router.post('/google',(req,res)=>{
	const {tokenId} = req.body
	client.verifyIdToken({idToken:tokenId,audience:process.env.API_AUDENCE_GOOGLE}).then(response=>{
		const {email_verified,given_name,family_name,email,at_hash} = response.payload;
		// console.log(response.payload)
		if(email_verified){
					const param={
						firstName:given_name,
						lastName:family_name,
						email:email
					}
					socialLoginUser(email,res,param)
		}else{
			console.log("false")
		}
	})

})
//email_verifyed , response , data user
const socialLoginUser = (email,res,data)=>{
	User.findOne({email}).exec((err,user) => {
				if(err){
					console.log("error")
					return res.status(400).json({
						message:"wrong"
					})
				}else{
					if(user){
						createToken(user,res)
					}else{
						const newUser = new User({firstName:data.firstName,
												lastName:data.lastName,
												email:data.email
												})
						newUser.save((err,user)=>{
							if(user){
								createToken(user,res)
							}else{
								return res.status(400).json({
									error:"error register"
								})
							}
						})
					}
				}
			});
}




const createToken = (user,res)=>{
	const token = jwt.sign({_id:user._id},process.env.JWT_KEY,{expiresIn:'7d'}) //id save
		return res.json({
			token,user
		})
}
//

//login successfull !! ..
router.post('/login',async (req,res)=>{
	const {email,password} = req.body;
	await User.findOne({ email: email }, function (err, user) {
		if(err)return res.status(500).json({error:"existe"})
		if(user){
			bcrypt.compare(password, user.password, function(err, result) {
				if(result){
					createToken(user,res);
				}else{
					return res.status(400).json({error:"Password Incorrecto"})
				}
			});
			// return res.status(200).json({error:""})
		}else{
			return res.status(400).json({error:"Correo Ingresado no Existe"})
		}

	});
})

// REGISTE successfull ! ....
router.post('/register',async(req,res)=>{
	await User.findOne({email:req.body.email},function(err,user){
		if(user){
			return res.status(400).json({error:"Usuario Ya Existe"})
		}else{
			bcrypt.hash(req.body.password, salt_rounds,async function(err, hash) {
			const data = new User({firstName:req.body.firstName,
					lastName:req.body.lastName,
					email:req.body.email,
					password:hash});
					 await data.save().then((err,item)=>{
					 	return res.status(200).json({message:"save"})
					})
			});
		}
	})
	
	
})

router.get('/dashboard',verifyToken,async(req,res)=>{
	const id = req.id;
	await User.findOne({_id:id},function(err,user){
		if(user){
			return res.status(200).json(user)
		}
	});
})



module.exports = router;