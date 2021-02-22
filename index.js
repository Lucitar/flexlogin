const express = require('express')
const app = express()

const { Sequelize, QueryTypes } = require('sequelize')
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('postgres://postgres:lucio@localhost:5432/g4flex')
//new Sequelize('postgres://user:pass@example.com:5432/dbname') <---


app.use(express.json())

app.get('/', async(req, res) => {
	res.send('index')
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	  } catch (error) {
		console.error('Unable to connect to the database:', error);
	  }
	console.error('aaaa')
})

app.get('/register', (req, res) => {
	res.send('registerget')
})

app.post('/register', async(req, res) => {
	try {
		let nome = req.body.nome;
		let senha = req.body.senha;
		let salto = 10;

		await bcrypt.genSalt(salto, function(err, salt) {
			bcrypt.hash(senha, salt, function(err, hash) {
				sequelize.query(`INSERT INTO usuarios (nome, senha) VALUES ('${nome}', '${hash}')`);
			});
		});
	} catch (error) {
		console.error(error);
	}
	res.end()

})

app.get('/login', (req, res) => {
	res.send('loginget')
})

app.post('/login', async (req, res) => {
	try{

		let nomelogin = req.body.nome;
		let senhalogin = req.body.senha;

		const userhash = await sequelize.query(`SELECT * FROM usuarios WHERE nome = '${nomelogin}'`, { type: QueryTypes.SELECT });
		
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
app.get('/home', (req, res) => {
	res.send('home')
})

app.get('/semlogin', (req, res) => {
	res.send('sai daqui >:[')
})

app.listen(3000)