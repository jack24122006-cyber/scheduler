const Joi = require('joi')

const baseAuthFields = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
};

const loginSchema = Joi.object(baseAuthFields);

const registerSchema = Joi.object({
  ...baseAuthFields,
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
});

const validateLogin = (req,res,next)=>{
    const {error,value} = loginSchema.validate(req.body);
    if(error){
        // return res.status(400).json({
        //     message: error.message
        // })
        console.log('Validation error:', error.message);
    }
    
    next()
}

const validateRegister = (req,res,next)=>{
    const {error,value} = registerSchema.validate(req.body);
    if(error){
        // return res.status(400).json({
        //     message: error.message
        // })
        console.log('Validation error:', error.message);
    }
    next()
}

module.exports = {validateLogin,validateRegister}