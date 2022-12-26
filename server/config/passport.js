const keys=require("./keys")
const usersModel= require("../models/usersModel")
const jwtStrategy=require("passport-jwt").Strategy
const extractJwt=require("passport-jwt").ExtractJwt

const options={
    secretOrKey:keys.secretKey,
    jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken()
}

module.exports=(passport)=>{
    passport.use(
        new jwtStrategy(options,(jwt_payload,done)=>{
            usersModel.findById(jwt_payload.id)
            .then((user)=>{
                console.log("user found");
                return done(null,false)
            })
            .catch((error)=>{
                console.log(error);
                return done(error)
            })
        })
    )
} 