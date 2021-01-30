const mongoose = require("mongoose")

const imagenSchema =  mongoose.Schema({
	imageUrl:String,
	title:String,
	public_id:String,
	id_user:String
},{timestamps:true})

const Imagen = mongoose.model('Imagen',imagenSchema);
module.exports = Imagen;