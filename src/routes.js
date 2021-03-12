const express = require('express')

const UserController = require('./controllers/UserController').default
const userController = new UserController();

router = express.Router()


// Métodos GET

router.get('/', async(req, res) => {

	res.render('../pages/index')
})

router.get('/register', (req, res) => {
	res.render('../pages/register')
})

router.get('/login', (req, res) => {
	res.render('../pages/login')
})

router.get('/home', (req, res) => {
	res.render('../pages/home')
})

router.get('/semlogin', (req, res) => {
	res.send('sai daqui >:[')
})

router.get('/show', userController.show)

// Métodos POST 

router.post('/register', userController.register)

router.post('/login', userController.login)


module.exports = router;