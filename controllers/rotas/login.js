const model = new require('../../models/usuario')
const auth = require('../auth')
const validacao = require('../validacao')
const usuario = require('./usuario')

module.exports = (app)=>{
    app.get('/cadastrar/usuarios', (req, res)=>res.sendFile('../../../templates/index.js'))
    app.post('/login', async(req, res)=>{
        try{
            let dados = req.body
            let validaLogin = await validacao.validarLogin(dados, model)
            if(validaLogin.autenticado){
                let {id, nome, email} = validaLogin.usuario.dataValues
                dados = {id, nome, email}
                let token = await auth.gerarToken(dados)
                return res.json({dados, token:token}).status(200)
            }else{
                return res.json(validaLogin).status(200)
            }
        }catch(error){
            return res.json(error).status(400)
        }
    })
    app.put(`/login/atualizarEmail`, auth.validarToken ,async (req, res) => {
        try {
        var id = req.usuarioAtual.id;
        var { email } = req.body;
        var usuario = await model.findOne({ where: { id: id, email: email } });
        if (usuario !== null) {
            res.status(200).json({ message: "Email Igual ao atual", autenticado: false });
        } else {
            var respBd = await model.update({ email: email }, { where: { id: id } });
            res.status(200).json({message:"dados atualizados", respBd})
        }
        } catch (error) {
            res.status(401).json({message:"ocorreu um erro"})
        }
    })
    app.put(`/login/atualizarSenha`, auth.validarToken ,async (req, res) => {
        try {
            var id = req.usuarioAtual.id;
            let validaLogin = await validacao.validarLogin(dados, model)
            if (validaLogin.autenticado){
                if(auth.validarSenha())
            senha = await auth.criptografar(senha)
            if(senha != null) {
            var respBd = await model.update({ senha: senha }, { where: { id: id } });
            res.status(200).json({message:"dados atualizados", respBd})
        }else{
            res.status(401).json({message:"ocorreu um erro"})
        }
        }else{
            res.status(401).json({message:"Senhas nao coeciden"})
        }
        }catch(error) {
            res.status(401).json({message:"ocorreu um erro", error})
        }
    })
}