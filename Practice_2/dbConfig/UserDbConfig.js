const mongoose=require ('mongoose')

require('dotenv').config()

function dbConnect(){
    mongoose.connect(process.env.DB_URL)
    .then(console.log('Database is connected...'))
    .catch((err)=>{
        console.log("Error in DB Connection")
        console.log(err.massage)
        process.exit(0)
    })
}

module.exports=dbConnect