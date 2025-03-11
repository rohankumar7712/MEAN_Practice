const course=require('../Models/courseModel');


exports.createcourse=async(req,res)=>{
    try {
        const{courseId,courseName,courseDesc,courseBranch,startDate,endDate,courseduration,coursePrice,courseActive,registerd_date}=req.body

        if(courseId == ' ' ||courseName == ' '||courseDesc == ' '||courseBranch == ' ' ||startDate == ' '||endDate == ' '||courseduration == ' '||coursePrice == ' '||courseActive == ' '||registerd_date == ' '){

            res.status(400).json({
                success: false,
                message: 'All fields required !'
            })
        }
        const cheackCourse=await course.find({courseId:courseId});
        if(cheackCourse.length != 0){
            res.status(302).json({
                success: false,
                message: `courseId => ${courseId} is already exists in collection!`
            })
        }
        await course.create({
            courseId:courseId,
            courseName:courseName,
            courseDesc:courseDesc,
            courseBranch:courseBranch,
            startDate:startDate,
            endDate:endDate,
            courseduration:courseduration,
            coursePrice:coursePrice,
            courseActive:courseActive,
            registerd_date:registerd_date
        });
        res.status(201).json({
            success: true,
            message: 'course successfully created !',
            data: req.body
        }); 
        
    } 
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        }) ;
    }

}
exports.updatecourse=async(req,res)=>{
    try {
        const pramid=req.params.pramid;
        const courses =await course.find({courseId:pramid})

        if(courses.length != 0){
            await course.findOneAndUpdate({courseId:req.params.pramid},req.body);
            res.status(200).json({
                success:true,
                message:'Course Update Sucessfully',
                course:req.body
            })
        }
        else{
            res.status(401).json({
                success: false,
                message: `course ID => ${pramid} does not exists in collection`,
            }) 
        }
    } 
    catch (error) {
        res.status(403).json({
            success: false,
            message: error.message
        }) 
    }
    
}
exports.deletecourse=async(req,res)=>{
    try {
        const pramid=req.params.pramid;
        const courses =await course.find({courseId:pramid})
        if(courses.length != 0){
            await course.findOneAndDelete({courseId:req.params.pramid},req.body);
            res.status(200).json({
                success:true,
                message:`course ID => ${pramid} delete from collection`
            })
        }
        else{
            res.status(401).json({
                success: false,
                message: `course ID => ${pramid} does not exists in collection`,
            }) 

        }  
    } 
    catch (error) {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }
    
}
exports.shoallcourses=async(req,res)=>{
    try {
        const alldata=await course.find();
        res.status(200).json({
            success:true,
            data:alldata,
        });
        
    } 
    catch (error) {
        res.status(403).json({
            success:false,
            message:error.message,
        });
    }
    
}
exports.getcourse=async(req,res)=>{
    try {
        const paramId =req.params.paramId;
        const courses = await course.find({courseId:paramId})
        if(courses.length !=0){
            res.status(200).json({
                success:true,
                data:courses,
            });
        }   
        else{
            res.status(401).json({
                success:false,
                message:`courseID ${paramId} is dosen't exist`
            })
        }    
    } 
    catch (error) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
    
}
exports.getcoursebybranch=async(req,res)=>{
    try {
        const paramId =req.params.paramId;
        const courses = await course.find({courseBranch:paramId});
        if(courses.length !=0){
            res.status(200).json({
                success:true,
                data:courses,
            });
        }
        else{
            res.status(401).json({
                success:false,
                message:`courseBranch ${paramId} is dosen't exist`
            })
        }
    } 
    catch (error) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
    
}
exports.getcoursebyflag=async(req,res)=>{
    try {
        const flag = req.query.flag;
    
        // Validate the flag value and set isActive based on flag
        const isActive = flag === 'true';
    
        let courses;
    
        if (isActive) {
            // Fetch active courses
            courses = await course.find({ courseActive: true });
        } else {
            // Fetch inactive courses
            courses = await course.find({ courseActive: false });
        }
    
        if (courses.length !== 0) {
            return res.status(200).json({
                success: true,
                data: courses,
            });
        } else {
            // Changed status to 404 for "not found"
            return res.status(404).json({
                success: false,
                message: 'No courses available.',
            });
        }
    } catch (error) {
        // General error handling
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    
    
}

exports.getcoursebydate=async(req,res)=>{
    try {
        const { startDate, endDate, registerd_date } = req.query;  

       
        let filter = {};

       
        if (startDate) {
            filter.startDate = { $gte: new Date(startDate) }; 
        }

        if (endDate) {
            filter.endDate = { $lte: new Date(endDate) }; 
        }

        if (registerd_date) {
            filter.registerd_date = { $gte: new Date(registerd_date) };  
        }

        const courses = await course.find(filter);

        
        if (courses.length != 0) {
            res.status(200).json({
                success: true,
                data: courses,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No courses found matching the provided dates.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    
}
