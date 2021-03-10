const dbtools = require('../connection')
const connection = dbtools.sequelize()
const QueryTypes = dbtools.QueryTypes()

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


class UserController {
    async register(req, res){
        try {
            let nome = req.body.nome;
            let senha = req.body.senha;
            let salto = 10;
    
            await bcrypt.genSalt(salto, function(err, salt) {
                bcrypt.hash(senha, salt, function(err, hash) {
                    connection.query(`INSERT INTO usuarios (nome, senha) VALUES ('${nome}', '${hash}')`);
                });
            });
            return res.status(201)
        } catch (error) {
            console.error(error);
        }
    }

    async login(req, res){
        try{
            let nomelogin = req.body.nome;
            let senhalogin = req.body.senha;
            console.log(req.body)
            const userhash = await connection.query(`SELECT * FROM usuarios WHERE nome = '${nomelogin}'`, { type: QueryTypes.SELECT });
            console.log(userhash)
            await bcrypt.compare(senhalogin, userhash[0].senha, function(err, result) {
                if(result==true){
                    console.log("logado")

                    var token = jwt.sign({
                        nomelogin:  req.body.nome,
                        senhalogin:  req.body.senha
                    }, 'segredo', {expiresIn: '1h'});
                    req.auth = token
                    res.status(200).json({"access_token": token})
                }else{
                    console.log("não logado")
                    res.redirect('../semlogin')
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

}

exports.default = UserController;