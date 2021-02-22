const express = require('express')
const bcrypt = require('bcrypt');

const dbtools = require('./connection')
const connection = dbtools.sequelize()
const QueryTypes = dbtools.QueryTypes()

router = express.Router()

router.get('/', async(req, res) => {
	res.render('../pages/index')
})

router.get('/register', (req, res) => {
	res.render('../pages/register')
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

})

router.get('/login', (req, res) => {
	res.render('../pages/login')
})

router.post('/login', async (req, res) => {
	try{
		var nomelogin = req.body.nome;
		var senhalogin = req.body.senha;
        console.log(req, req.body)
		const userhash = await connection.query(`SELECT * FROM usuarios WHERE nome = '${nomelogin}'`, { type: QueryTypes.SELECT });
		
		await bcrypt.compare(senhalogin, userhash[0].senha, function(err, result) {
			//res.redirect('/home')
			if(result==true){
				console.log("logado")
                res.redirect('../home')
			}else{
				console.log("não logado")
                res.redirect('../semlogin')
			}
		});
	}catch (error) {
		console.error(error);
	}
})

// Sem sistema de sessão :(
router.get('/home', (req, res) => {
	res.render('../pages/home')
})

router.get('/semlogin', (req, res) => {
	res.send('sai daqui >:[')
})


module.exports = router;