const model = new require('../../models/usuario')
const validacao = require('../validacao')
const auth = require('../auth')
const rota = 'usuarios'
module.exports = (app)=>{
    app.post(`/cadastrar/${rota}`, async (req, res)=>{
        try{
            let dados = req.body;
            let dadoslogin = await validacao.validarCadastro(dados, model)
            if(dadoslogin.validacao){
                dados.senha = await auth.criptografar(dados.senha)
                let respBd = await model.create(dados)
                delete respBd.dataValues.senha
                res.json(respBd).status(201)
            
            }else{
                res.json(dadoslogin).status(200)
            }
        }
        catch(error){
            res.json(error).status(401)
        }
    })
    
    app.get(`/consultar/${rota}/:id?`, async (req, res)=>{
        let dados = req.params.id? await model.findOne({where:{id:req.params.id}}) : 
        await model.findAll()
        res.json(dados)
    })
    app.put(`/atualizar/${rota}/:id`, async (req, res) => {
        let id = req.params.id
        let dados = req.body
        let respBd = await model.update(dados, {where:{id:id}})
        res.json(respBd)
    })
    app.delete(`/excluir/${rota}/:id`, async (req, res) => {
        let id = req.params.id
        let respBd = await model.destroy({where:{id:id}})
        res.json(respBd)
    })
}