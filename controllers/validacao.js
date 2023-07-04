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
    }
}