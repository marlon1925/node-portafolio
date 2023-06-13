//INVOCAR LA FUNCIÓN ROUTER
const { Router } = require('express')
//INVOCAR LAS FUNCIONES DEL CONTROLADOR
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/user.controller')
//INICIALIZACION
const router = Router()


router.get('/user/register', renderRegisterForm)
router.post('/user/register', registerNewUser)
router.get('/user/login', renderLoginForm)
router.post('/user/login', loginUser)
router.post('/user/logout', logoutUser)


module.exports = router