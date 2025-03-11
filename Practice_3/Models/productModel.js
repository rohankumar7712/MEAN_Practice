const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    productid:{
        type:String,
        require:true,
        unique:true

    },
    productName:{
        type:String,
        require:true,
      

    },
    Price:{
        type:String,
        require:true,

    },
    Quntity:{
        type:String,
        require:true,

    },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
    
})

module.exports=mongoose.model("product",ProductSchema)

