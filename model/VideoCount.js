const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const VideoCountSchema = new Schema({
	say: {
		type: Number,
		            
	},
	userId:Schema.Types.ObjectId,
	
});

module.exports = mongoose.model('videoCount', VideoCountSchema);