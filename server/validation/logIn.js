const validator = require("validator");
const isEmpty = require("is-empty");
const Joi = require("@hapi/joi");


module.exports = validateLogIn = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
});
const{error}=schema.validate(user);
return {error}
};














// errors = {};
// user.email = isEmpty(user.email) ? "" : user.email;
// user.password = isEmpty(user.password) ? "" : user.password;

// if (validator.isEmpty(user.email)) errors.email = "email is required";
// if (!validator.isEmail(user.email)) errors.email = "email isn't valid";
// if (validator.isEmpty(user.password))errors.password = "Password is required";
// return {
//   errors,
//   isValid: isEmpty(errors),
// };