const express=require('express')
const routes=express.Router()

const courseClt=require('../Controllers/courseController')

routes.post('/createcourse',courseClt.createcourse)
routes.get('/shoallcourses',courseClt.shoallcourses)
routes.put('/updatecourse/:pramid',courseClt.updatecourse)
routes.delete('/deletecourse/:pramid',courseClt.deletecourse)
routes.get('/getcourse/:paramId',courseClt.getcourse)
routes.get('/getcoursebybranch/:paramId',courseClt.getcoursebybranch)
routes.get('/getcoursebyflag',courseClt.getcoursebyflag)
routes.get('/getcoursebydate',courseClt.getcoursebydate)




module.exports=routes