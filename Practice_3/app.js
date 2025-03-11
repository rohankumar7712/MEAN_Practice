const express=require('express');

const app=express()

require('dotenv').config()

const port=process.env.PORT;

app.use(express.json()); //body-parser()
app.use(express.urlencoded({extended: true}));

const dbConnect=require('./dbConfig/dbConfig');
dbConnect();

const productRoutes=require('./routes/productRoutes');
app.use('/api',productRoutes)

app.get("/",async(req,res)=>{
    res.send("<h1> REST API ruuning on server </h1>")
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})