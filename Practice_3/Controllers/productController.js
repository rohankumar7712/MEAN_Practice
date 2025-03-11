const productmodel=require("../Models/productModel")

exports.addProduct=async(req,res)=>{
    try{
        const{productid,productName,Price,Quntity}=req.body;
        if(productid==''||productName==''||Quntity==''||Price==''){
            res.status(400).json({
                success: false,
                message: 'All fields required !'
            })       
        }
        const checkproduct = await productmodel.find({productid: productid});
        if(checkproduct.length!=0){
            res.status(401).json({
                success: false,
                message: `ProductID => ${productid} is already exists in collection!`
            })  
        }
        await productmodel.create({
            productid: productid,
            productName: productName,
            Quntity: Quntity,
            Price: Price
        });
        res.status(200).json({
            success: true,
            message: 'Product successfully created !',
            data: req.body
        }); 

    }
    catch(err){
        res.status(404).json({
            success: false,
            message: err.message
        }) 
    }
}

exports.showProduct = async(req, res) => {
    try {
        const alldata = await productmodel.find();
        res.status(200).json({
            success: true,
            data: alldata,
        });
    }
    catch(error) {
        res.status(403).json({
            success: false,
            message: error.message
        }) 
    }
}
exports.getproduct = async(req,res)=> {
    try {
        const prid = req.params.prid;
        const singleproduct = await productmodel.find({productid: prid});
        if(singleproduct.length!=0) {
            res.status(200).json({
                success: true,
                data: singleproduct,
            });
        }
        else
        {
            res.status(401).json({
                success: false,
                message: `Product ID => ${prid} does not exists in collection`,
            })
        }
    }
    catch(error){
        res.status(403).json({
            success: false,
            message: error.message
        }) 
    }
}
exports.delproduct = async(req,res)=> {
    try {
        const prid = req.params.prid;
        const singleproduct = await productmodel.find({productid: prid});
        if(singleproduct.length!=0) {

            await productmodel.deleteOne({productid: prid});
            
            res.status(200).json({
                success: true,
                message: 'Product deleted siccessfully!',
            });
        }
        else
        {
            res.status(401).json({
                success: false,
                message: `Product ID => ${prid} does not exists in collection`,
            })
        }
    }
    catch(error){
        res.status(403).json({
            success: false,
            message: error.message
        }) 
    }
}
exports.updproduct = async(req, res)=> {
    try {
        const prid = req.params.prid;
        const singleproduct = await productmodel.find({productid: prid});
        if(singleproduct.length!=0) {
            await productmodel.finbodOneAndUpdate(
                { productid: req.params.prid}, req.body);
            res.status(200).json({
                success: true, 
                message: 'Product updated successfully!',
                product: req.body
            });
        }
        else
        {
            res.status(401).json({
                success: false,
                message: `Product ID => ${prid} does not exists in collection`,
            }) 
        }
    }
    catch(error) {
        res.status(403).json({
            success: false,
            message: error.message
        }) 
    }
}


