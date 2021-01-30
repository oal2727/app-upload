const jwt = require("jsonwebtoken")


exports.verifyToken = (req,res,next)=> {

		let query = req.header('authorization').split(' ')
		let token = query[1]
		jwt.verify(token,process.env.JWT_KEY,(error,decoded)=> {
				console.log("verificando token")
				if(error){
					return res.status(500).json(error)
				}
				req.id = decoded._id
			})
			next();
}
