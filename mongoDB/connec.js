import mongoose from 'mongoose';

const connectDb = (url) =>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
        .then(()=> console.log("MongoDb Connected"))
        .catch((err)=> console.log(err))
}

export default connectDb