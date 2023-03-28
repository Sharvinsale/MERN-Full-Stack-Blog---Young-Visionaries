import mongoose from "mongoose"


  const Connection = async (username,password) => {
    
    try{
        const URL = `mongodb://${username}:${password}@ac-3ofk10u-shard-00-00.jdbcuga.mongodb.net:27017,ac-3ofk10u-shard-00-01.jdbcuga.mongodb.net:27017,ac-3ofk10u-shard-00-02.jdbcuga.mongodb.net:27017/?ssl=true&replicaSet=atlas-733gy7-shard-0&authSource=admin&retryWrites=true&w=majority`;
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch(error){
        console.log('Error connecting to database', error);
    }
}

export default Connection;