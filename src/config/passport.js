//
const passport = require('passport')
//importar el modelo user
const User = require('../models/User')
// definicion de la estrategia
const LocalStrategy = require('passport-local').Strategy


//configuracion de la estrategia
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    // TRAER USUARIO EN BASE AL EMAIL
    const userBDD = await User.findOne({email})
    //VALIDACION DEL USUARIO
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    //vALIDACION DE LA CONTRASEÑA
    const passwordUser = await userBDD.matchPassword(password)
    //VALIDACION DEL PASWORD DEL FORMULARIO VS EL DE LA BASE DE DATOS
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    //RETORNA EL USUARIO
    return done(null,userBDD)
}))


//SERIALIZACION DEL USUARIO
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//DESERIALIZACION DEL USUARIO
passport.deserializeUser(async (id, done) => {
    //TRAER EL USUARIO  EN BASE AL ID DE LA SESSION
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});