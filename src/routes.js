const express = require('express')
const bcrypt = require('bcrypt');

const dbtools = require('./connection')
const connection = dbtools.sequelize()
const QueryTypes = dbtools.QueryTypes()

router = express.Router()

router.get('/', async(req, res) => {
	res.send('index')
	try {
		await connection.authenticate();
		console.log('Connection has been established successfully.');
	  } catch (error) {
		console.error('Unable to connect to the database:', error);
	  }
	console.error('aaaa')
})

router.get('/register', (req, res) => {
	res.send('registerget')
})

router.post('/register', async(req, res) => {
	try {
		let nome = req.body.nome;
		let senha = req.body.senha;
		let salto = 10;

		await bcrypt.genSalt(salto, function(err, salt) {
			bcrypt.hash(senha, salt, function(err, hash) {
				connection.query(`INSERT INTO usuarios (nome, senha) VALUES ('${nome}', '${hash}')`);
			});
		});
	} catch (error) {
		console.error(error);
	}
	res.end()

})

router.get('/login', (req, res) => {
	res.send('loginget')
})

router.post('/login', async (req, res) => {
	try{

		let nomelogin = req.body.nome;
		let senhalogin = req.body.senha;

		const userhash = await connection.query(`SELECT * FROM usuarios WHERE nome = '${nomelogin}'`, { type: QueryTypes.SELECT });
		
		await bcrypt.compare(senhalogin, userhash[0].senha, function(err, result) {
			//res.redirect('/home')
			if(result==true){
				console.log("logado")
			}else{
				console.log("logado")
			}
		});
	}catch (error) {
		console.error(error);
	}
	res.end()
})

// Sem sistema de sessão :(
router.get('/home', (req, res) => {
	res.send('home')
})

router.get('/semlogin', (req, res) => {
	res.send('sai daqui >:[')
})


module.exports = router;