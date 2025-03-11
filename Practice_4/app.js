const express =require('express');
const app=express();

require('dotenv').config()
const port=process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const dbConnect=require('./dbConfig/dbConfig');
dbConnect();

const courseRoutes=require('./Routes/courseRoutes');
app.use('/api',courseRoutes)

app.get('/',(req,res)=>{
    res.send('<h1> welcome Use!</h1>')
})


app.listen(port,()=>{
    console.log(`server is  Running on http://localhost:${port}`)
})

