const Joi = require('joi')
const validateLength = (value , helper) => {
    let len = (value.split(" ")).length
    if (len < 100){
        return helper.message("Count of Words less than 100")
    }else{
        return value
    }
}
const personData = (data)=>{
    return new Promise((resolve , reject)=>{
        const schema = Joi.object({
            title : Joi.string().min(3).max(50).required() ,
            years : Joi.number().min(0).max(50).required() ,
            unique : Joi.string().min(3).required() ,
            choose : Joi.string().min(3).required() ,
            career : Joi.string().min(3).custom(validateLength).required(),
            cv : Joi.string()
        })
        const {error , value} = schema.validate(data)
        if (error){
            resolve({
                valid : 0 ,
                error
            })
        }else{
            resolve({
                valid : 1
            })
        }
    })
}

module.exports = { personData }