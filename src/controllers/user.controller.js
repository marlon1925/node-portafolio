const User = require('../models/User')

const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
const passport = require("passport")


const registerNewUser = async(req,res)=>{
    //DESTRUCTURACION DE LOS DATOS EL FORMULARIO
    const{name,email,password,confirmpassword} = req.body
    // VALIDAD SI TODOS LOS CAMPOS ESTÁN COMPLETOS
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //VALIDACION DE LAS CONTRASEÑAS

    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
        //VERIFICAR SI EXISTE EL USUARIO
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //GUARDAR EL REGISTRO EN LA BDD
    const newUser = await new User({name,email,password,confirmpassword})
    //ENCRIPTAR EL PASSWORD
    newUser.password = await newUser.encrypPassword(password)
    newUser.save()
    res.redirect('/user/login')
}

const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

const logoutUser =(req,res)=>{
    res.send('logout user')
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}