import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://yvickyp2:8948vVI$@cluster0.y7ar7.mongodb.net/food-del').then(
        () =>console.log("DB Connected"))
}
 


 