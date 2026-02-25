const Joi = require('joi')

const gradeSchema = Joi.object({
    name: Joi.string().min(6).required(),
    code: Joi.string().required(),
    number: Joi.number().min(1).max(10).required(),
    note: Joi.string().allow('')
})

const validateGrade = (req,res,next)=>{
    const {error, value} = gradeSchema.validate(req.body)
    if(error){
        return res.status(400).json({
            messgae:error.details[0].message
        })
    }
    next()
}

module.exports=validateGrade