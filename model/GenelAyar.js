const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const GenelAyarSchema = new Schema({
	userId:Schema.Types.ObjectId,
	logo: {
		type: String,
		            
    },
   
	date:{
		type:Date,
		default:Date.now,
	}	,
	 
});

module.exports = mongoose.model('genelayar', GenelAyarSchema);