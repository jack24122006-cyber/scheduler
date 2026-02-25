const  Joi = require('joi')

const envSchema = Joi.object({
    PORT: Joi.number().required(),
    JWT_SECRET: Joi.string().min(5).required()
}).unknown()
const {error, value} = envSchema.validate(process.env)

if(error){
    throw new Error(`ENV valid error :${error.message}`)
}

module.exports = value