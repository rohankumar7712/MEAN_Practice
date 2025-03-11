const express=require("express")

const router=express.Router()

const productcontroller=require("../Controllers/productController")

router.post('/addProduct',productcontroller.addProduct);
router.get('/showProduct',productcontroller.showProduct);
router.put('/updproduct/:prid',productcontroller.updproduct);
router.delete('/delproduct/:prid',productcontroller.delproduct);
router.get('/getproduct/:prid',productcontroller.getproduct);




module.exports=router