const mongoose =require('mongoose');

function dbConnect(){
    mongoose.connect(process.env.DB_URL)
    .then(console.log('Database is connected'))
    .catch((err)=>{
        console.log('Database Connection Issue....')
        console.log(err)
    })
    
}

module.exports=dbConnect

