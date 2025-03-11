const mongoose=require('mongoose')

const courseSchema = new  mongoose.Schema({
    courseId:{
        type:String,
        require:true,
        unique:true
    },
    courseName:{
        type:String,
        require:true
    },
    courseDesc:{
        type:String,
        require:true

    },
    courseBranch:{
        type:String,
        require:true

    },
    startDate:{
        type:Date,
        require:true

    },
    endDate:{
        type:Date,
        require:true

    },
    courseduration:{
        type:String,
        require:true

    },
    coursePrice:{
        type:String,
        require:true

    },
    courseActive:{
        type:Boolean,
        require:true

    },
    registerd_date:{
        type:Date,
        require:true
    }

})

module.exports=mongoose.model('course',courseSchema)