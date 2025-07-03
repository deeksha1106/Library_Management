const mongoose = require('mongoose');
require('dotenv').config(); 

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL) 
  .then(() => console.log('MongoDB Connection Successful'))
  .catch((err) => {
    console.log('MongoDB connection Failed');
    console.error(err);
  });

module.exports = mongoose.connection;
