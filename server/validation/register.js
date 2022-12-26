const Joi = require("@hapi/joi");

const validateRegister = (user) => {
    console.log(user, 'gfgfgfgfgfg');
    const schema = Joi.object({
        fullName: Joi.string().min(5).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required(),
        passwordRep: Joi.string().min(5).required(),
    });
    // errors={};
    // user.PasswordConfirmation = isEmpty(user.PasswordConfirmation)?"":user.PasswordConfirmation
    // if(validator.isEmpty(user.PasswordConfirmation)) errors.PasswordConfirmation="the password repetition isn't the same"
    const{error}=schema.validate(user);
    return {error}
};
module.exports = { validateRegister };



// user.fullName = isEmpty(user.fullName)?"":user.fullName
// user.Email = isEmpty(user.Email)?"":user.Email
// user.Password = isEmpty(user.Password)?"":user.Password
// if(validator.isEmpty(user.fullName)) errors.fullName="full name is required"
// if(validator.isEmpty(user.email)) errors.email="email is required"
// if(validator.isEmail(user.email)) errors.email="email isn't valid"
// if(validator.isEmpty(user.Password)) errors.Password="Password is required"



// const validator = require("validator")
// const isEmpty= require("is-empty")
// const schema= Joi.object({
//     fullName: Joi.string().min(5).required(),
//     birthDate: Joi.string().required(),
//     email: Joi.string().min(5).required().email(),
//     password: Joi.string().min(5).required()
// })
// return schema.validate(user, {abortEarly:false})
