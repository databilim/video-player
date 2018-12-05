
const mongoose = require('mongoose');

module.exports = () => {
   
    mongoose.connect('mongodb://video-player-client:Cx9544Cx@ds237363.mlab.com:37363/video-player-client' ,{ useNewUrlParser: true})
 
  mongoose.connection.on('open', () => {
     console.log('MongoDB: Connected');
  });
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
  });

  mongoose.Promise = global.Promise;
};
