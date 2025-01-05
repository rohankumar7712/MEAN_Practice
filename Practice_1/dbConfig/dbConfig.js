const mongoose=require('mongoose')

require('dotenv').config()

function dbconnect(){
    mongoose.connect(process.env.DB_URL)
    .then(console.log("connection is successfull"))
    .catch((err)=>{
    console.log("Error in db connection ")
    console.error(err.message)
    process.exit(0)
    })
}
module.exports = dbconnect;



