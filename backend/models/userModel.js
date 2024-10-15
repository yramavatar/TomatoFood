import mongoose from "mongoose"

// defining user scema for data to be stored 

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}

},{minimize:false})   // to use cartData be saved we  have used minimise :false because in frontend we havent cartdata

// if the model is already created then or by using  it will created by userSchema
const userModel = mongoose.models.user || mongoose.model("user",userSchema); 

export default userModel;
 