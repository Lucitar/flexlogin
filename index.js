const express = require('express')
const app = express()

const routes = require('./src/routes')

const bodyParser = require('body-parser');

const expressJWT = require('express-jwt')
app.use(
    expressJWT({secret: 'segredo', requestProperty: 'auth', algorithms: ['HS256']})
    .unless({path: ['/', '/login', '/semlogin', '/register']})
)

app.set('view engine', 'ejs')
//app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}));//{extended:true}
//app.use(bodyParser.json());

app.use('/', routes)



app.listen(3000, () => console.log("Server Rodando!"))