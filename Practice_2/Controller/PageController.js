const path =require('path');

exports.getPage=(page)=>(req,res)=>{
    res.sendFile(path.join(__dirname,'..','pages',`${page}.html`))
}