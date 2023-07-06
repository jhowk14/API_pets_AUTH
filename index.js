const express = require('express')
const consign = require('consign')
const app = express()
const path = require('path');
const baseDir = path.resolve(__dirname);

var porta = '3200'
app.use(express.urlencoded({extended:true}))
app.use(express.static(baseDir));
app.use(express.json())
app.get('/cadastrar/usuarios', (req, res)=>res.sendFile(`${baseDir}/templates/index.html`))
app.get('/login', (req, res)=>res.sendFile(`${baseDir}/templates/index.html`))
app.get('/', (req, res)=>res.send('API - Amigo do Pet'))
consign()
    .include('./controllers/rotas')
    .into(app)

app.listen(porta, ()=>console.log(`Servidor rodando em: http://localhost:${porta}`))