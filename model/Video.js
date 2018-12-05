const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const VideoSchema = new Schema({
	userId:Schema.Types.ObjectId,
	file: {
		type: String,
		            
    },
    description: {
		type: String,
		            
    },
    title: {
		type: String,
		            
	},
	type: {
		type: String,
		
	},
	date:{
		type:Date,
		default:Date.now,
	}	,
	sira:{
			type:Number,
	}
});

module.exports = mongoose.model('video', VideoSchema);