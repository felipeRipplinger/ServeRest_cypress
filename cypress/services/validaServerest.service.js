
export default class ValidaServerest {
    //Validação das ações da API

    static validarBuscaDeUsuarios(resposta){
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validarLoginComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Login realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('authorization')
    }

    static validarLoginSemSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
    }

    static validarBuscaDeProdutos(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.quantidade).to.be.greaterThan(0)
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
    }

    static validarCadastroDeProdutosComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
    }

    static validarCadastroDeProdutosSemSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Já existe produto com esse nome')
    }

    static validarCadastroDeProdutosSemSucessoToken(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarCadastroDeProdutosSemSucessoAdm(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
    }

} 