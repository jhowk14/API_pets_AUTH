const auth = require('./auth');
module.exports = {
    validarCadastro: async(dados, model)=>{
        let usuario = await model.findOne({where: {email: dados.email}})
        if(usuario != null){
            return {erro: 'Email invalido', message: "eamil ja cadastrado"}
        }else if(dados.senha != dados.confirmacao){
            return {erro:'senha', message: 'Senhas não coeciden'}
        }
        return {validacao:true}
    },
    validarLogin: async(dados, model)=>{
        let usuario = await model.findOne({where: {email: dados.email}})
        if(usuario == null){
            return {message:"Email invaldo", autenticado:false}
        }
        else{
            let authSenha = await auth.validarSenha(dados.senha, usuario.senha)
            return authSenha? {usuario, autenticado:true}:{erro:{message:"senha invalida"}, autenticado:false}
        }
        
    },
}