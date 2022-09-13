import Factory from '../fixtures/factory'

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class ServerestNegative {
    //Ações da API para testes negativos

    //Login-------------------------------------------------------------------

    static buscarUsuarioParaLogin(){
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password,
            }).as('usuarioLogin')

        })
    }

    static buscarUsuarioParaLoginAdm(){
        let i = 0
        cy.request(URL_USUARIOS).then( res => {
            while (res.body.usuarios[i].administrador === "false"){
                i++
            }
            cy.wrap({
                email: res.body.usuarios[i].email,
                password: res.body.usuarios[i].password,
            }).as('usuarioLogin')

        })
    }

    static cadastrarUsuarioParaLoginBase(){
        let usuario = Factory.gerarUsuario()

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: true
        })
    }

    static buscarUsuarioParaLoginBase(){
        let i = 0
        cy.request(URL_USUARIOS).then( res => {
            while (res.body.usuarios[i].administrador === "true"){
                i++
            }
            cy.wrap({
                email: res.body.usuarios[i].email,
                password: res.body.usuarios[i].password,
            }).as('usuarioLoginBase')

        })
    }

    static logar(usuario){
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static salvarBearer(resposta){
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }
    
    static logarSemSucesso(){
        let usuario = Factory.gerarUsuarioParaLogin()
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    //Usuarios-------------------------------------------------------------------

 
    static salvarIdUsuario(resposta){
        Cypress.env('idUser', resposta.body._id)
    }

    static cadastrarUsuarioComSucesso(){
        let usuario = Factory.gerarUsuario()

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: true
        })
    }

    static cadastrarUsuarioAdmComSucesso(){
        let usuario = Factory.gerarUsuarioAdm()

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: true
        })
    }

    static buscarUsuarioParaCadastroNegativo(){
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                nome: res.body.usuarios[0].nome,
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password,
                administrador: res.body.usuarios[0].administrador,
            }).as('usuarioCadastro')

        })
    }

    static cadastrarUsuarioSemSucesso(res){
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: res,
            failOnStatusCode: false
        })
    }

    static buscarUmUsuarioSemSucesso(){
        let id = Factory.gerarIdAleatorio()
        return cy.request({
            method: 'GET',
            url: `/usuarios/${id}`,
            failOnStatusCode: false
        })
    }

    static editarUsuarioComSucesso(){
        let produto = Factory.gerarUsuario()

        return cy.request({
            method: 'PUT',
            url: `/usuarios/${Cypress.env("idUser")}`,
            body: produto,
            failOnStatusCode: true,
        })
    }

    static buscarUsuarioComCarrinho(){
        cy.request(URL_CARRINHOS).then( res => {
            cy.wrap( res.body.carrinhos[0].idUsuario).as('idUsuario')
        })
    }

    static excluirUsuarioSemSucesso(res){

        return cy.request({
            method: 'DELETE',
            url: `/usuarios/${res}`,
            failOnStatusCode: false
        })
    }
    static verificarSeExisteUsuario(){
        cy.request({
            method: 'GET',
            url: URL_USUARIOS,
            failOnStatusCode: true
        }).then( res => {
            try{
                expect(res.body.usuarios[0]).to.have.property('_id')
                cy.log('Existe um usuário')
            }
            catch (err){
                let usuario = Factory.gerarUsuarioAdm()
                return cy.request({
                    method: 'POST',
                    url: URL_USUARIOS,
                    body: usuario,
                    failOnStatusCode: true
                })
            }
        })
    }

    static verificarSeExisteUsuarioAdm(){
        cy.request({
            method: 'GET',
            url: URL_USUARIOS,
            failOnStatusCode: true
        }).then( res => {
            let exist = (res.body.usuarios).find(x => x.administrador === 'true')
            if(exist === undefined){
                let usuario = Factory.gerarUsuarioAdm()
                return cy.request({
                    method: 'POST',
                    url: URL_USUARIOS,
                    body: usuario,
                    failOnStatusCode: true
                })
            }
            else {
                cy.log('Existe um usuário administrador')
            }
        })
    }

    static verificarSeExisteUsuarioBase(){
        cy.request({
            method: 'GET',
            url: URL_USUARIOS,
            failOnStatusCode: true
        }).then( res => {
            let exist = (res.body.usuarios).find(x => x.administrador === 'false')
            if(exist === undefined){
                let usuario = Factory.gerarUsuario()
                return cy.request({
                    method: 'POST',
                    url: URL_USUARIOS,
                    body: usuario,
                    failOnStatusCode: true
                })
            }
            else {
                cy.log('Existe um usuário base')
            }
        })
    }

    //Produtos-------------------------------------------------------------------

    static salvarIdProduto(resposta){
        Cypress.env('idPro', resposta.body._id)
    }

    static cadastrarProdutoSemSucessoAdm(){
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static cadastrarProdutoSemSucessoToken(res){
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: false,
        })
    }

    static buscarProdutoParaCadastroNegativo(){
        cy.request(URL_PRODUTOS).then( res => {
            cy.wrap({
                nome: res.body.produtos[0].nome,
                preco: res.body.produtos[0].preco,
                descricao: res.body.produtos[0].descricao,
                quantidade: res.body.produtos[0].quantidade,
            }).as('produtoCadastro')

        })
    }

    static cadastrarProdutoSemSucesso(res){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: res,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static buscarUmProdutoSemSucesso(){
        let id = Factory.gerarIdAleatorio()
        return cy.request({
            method: 'GET',
            url: `/produtos/${id}`,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static excluirProdutoComSucesso(){
        return cy.request({
            method: 'DELETE',
            url: `/produtos/${Cypress.env("idPro")}`,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static buscarProdutoParaAlterar(){
        cy.request(URL_PRODUTOS).then( res => {
            cy.wrap(res.body.produtos[0]._id).as('idProdutoAlt')
        })
    }

    static excluirProdutoSemSucessoToken(res){
        return cy.request({
            method: 'DELETE',
            url: `/produtos/${res}`,
            failOnStatusCode: false
        })
    }

    static editarProdutoSemSucessoToken(res){
        return cy.request({
            method: 'PUT',
            url: `/produtos/${res}`,
            failOnStatusCode: false
        })
    }

    static excluirProdutoSemSucessoAdm(res){
        return cy.request({
            method: 'DELETE',
            url: `/produtos/${res}`,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static editarProdutoSemSucessoAdm(res){
        return cy.request({
            method: 'PUT',
            url: `/produtos/${res}`,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static buscarProdutoEmCarrinho(){
        cy.request(URL_CARRINHOS).then( res => {
            cy.wrap( res.body.carrinhos[0].produtos[0].idProduto).as('idProduto')
        })
    }

    static excluirProdutoSemSucesso(res){
        return cy.request({
            method: 'DELETE',
            url: `/produtos/${res}`,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    //Carrinhos-------------------------------------------------------------------

    static buscarProdutoParaCarrinho(){
        cy.request(URL_PRODUTOS).then( res => {
            Cypress.env('ranPro', res.body.produtos[0]._id)
        })
    }

    static buscarCarrinhoAleatorio(){
        cy.request(URL_CARRINHOS).then( res => {
            Cypress.env('ranIdCar', res.body.carrinhos[0]._id)
        })
    }

    static buscarUmCarrinhoSemSucesso(){
        let id = Factory.gerarIdAleatorio()
        return cy.request({
            method: 'GET',
            url: `/carrinhos/${id}`,
            failOnStatusCode: false
        })
    }

    static cadastrarCarrinhoSemSucessoToken(){
        let id = Factory.gerarIdAleatorio()
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                "produtos": [
                  {
                    "idProduto": `${id}`,
                    "quantidade": 1
                  }
                ]
              },
            failOnStatusCode: false
        })
    }

    static cadastrarCarrinhoSemSucesso(){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                "produtos": [
                  {
                    "idProduto": `${Cypress.env("ranPro")}`,
                    "quantidade": 1
                  },
                  {
                    "idProduto": `${Cypress.env("ranPro")}`,
                    "quantidade": 1
                  }
                ]
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static cadastrarCarrinhoSemSucessoInex(){
        let id = Factory.gerarIdAleatorio()
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                "produtos": [
                  {
                    "idProduto": `${id}`,
                    "quantidade": 1
                  }
                ]
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static cadastrarCarrinhoSemSucessoQuantidade(){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                "produtos": [
                  {
                    "idProduto": `${Cypress.env("ranPro")}`,
                    "quantidade": 9007199254740991
                  }
                ]
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static cadastrarCarrinhoComSucesso(){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                "produtos": [
                  {
                    "idProduto": `${Cypress.env("ranPro")}`,
                    "quantidade": 1
                  }
                ]
              },
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static cadastrarCarrinhoSemSucessoDuplicado(){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                "produtos": [
                  {
                    "idProduto": `${Cypress.env("ranPro")}`,
                    "quantidade": 1
                  }
                ]
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }
    
    static concluirCarrinhoSemSucesso(){
        return cy.request({
            method: 'DELETE',
            url: '/carrinhos/concluir-compra',
            failOnStatusCode: false
        })
    }

    static cancelarCarrinhoSemSucesso(){
        return cy.request({
            method: 'DELETE',
            url: 'carrinhos/cancelar-compra',
            failOnStatusCode: false
        })
    }

    static cancelarCarrinho(){
        return cy.request({
            method: 'DELETE',
            url: 'carrinhos/cancelar-compra',
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

}