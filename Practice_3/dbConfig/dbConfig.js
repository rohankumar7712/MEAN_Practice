const mongoose=require('mongoose');

function dbConnect(){
    mongoose.connect(process.env.DB_URL)
    .then(console.log('Database is Connected'))
    .catch((err)=>{
        console.log('database is not coonected')
        console.log(err)
    })
}

module.exports=dbConnect