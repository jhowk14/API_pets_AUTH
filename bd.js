const {Sequelize} = require('sequelize')
const schema = 'amigo_do_pet'
const sequelize = new Sequelize(
    schema, 'root', '', { //nome Banco, usuario, senha
        host:'localhost', //caminho: ip ou nome DNS
        dialect:'mysql', //Banco de dados(SGBD) utilizado
        charset: 'utf8',//Tabela de caracteres
        collate: 'utf8_general_ci', //colação
        timezone:'-03:00'//timezone
    })
try {
    sequelize.authenticate() //método que autentica e cria a conexão
    console.log('Conectado ao banco: '+ schema)
} catch (erro) {
    console.log('Não foi possível conectar: ', erro )
}
module.exports = sequelize