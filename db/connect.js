const mongoose = require('mongoose');

db = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log('DB Connection Established...');
    }catch(error){
        console.log('Connection Error: ', error);
    }
}

module.exports = db;