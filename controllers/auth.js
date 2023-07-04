require('dotenv').config();
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const bcrypt = require('bcrypt')

const model = new require('../models/usuario')

module.exports = {
    criptografar: async (senha)=>{
        const salt = bcrypt.genSaltSync(12)
        return bcrypt.hashSync(senha, salt)
    },

    gerarToken: async (usuario)=> await jwt.sign(usuario, jwtSecret, {expiresIn: '1h'}),

    validarSenha: async(senha, hashSenha)=> await bcrypt.compare(senha, hashSenha),

    validarToken: (req, res, next) =>{
        try{
            let token = req.headers.authorization
            token = token.split(' ');
            token = token[1]
            jwt.verify(token, jwtSecret, (erro, dados)=>{
                if(erro){
                    res.json({message: 'Token invalido', error: erro}).status(401)
                }else{
                    req.token = token
                    req.usuarioAtual = {...dados}
                    next()
                }
            })
        }
        catch(err){
            res.json({message: "nao existe token na requisisao"}).status(401)
        }
    }
}