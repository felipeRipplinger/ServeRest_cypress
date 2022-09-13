import Factory from '../fixtures/factory'

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {
    //Ações da API

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

    static logar(usuario){
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static salvarBearer(resposta){
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }

    //Usuarios-------------------------------------------------------------------
    static buscarUsuarios(){
        return cy.rest('GET', URL_USUARIOS)
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

    static salvarIdUsuario(resposta){
        Cypress.env('idUser', resposta.body._id)
    }

    static salvarIdUsuarioAdm(resposta){
        Cypress.env('idUserAdm', resposta.body._id)
    }

    static buscarUmUsuarioComSucesso(){
        return cy.request({
            method: 'GET',
            url: `/usuarios/${Cypress.env("idUser")}`,
            failOnStatusCode: true
        })
    }

    static buscarUsuarioCadastradoParaLoginEmFluxo(){
        cy.request({
            method: 'GET',
            url: `/usuarios/${Cypress.env("idUser")}`,
            failOnStatusCode: true
        }).then( res => {
            cy.wrap({
                email: res.body.email,
                password: res.body.password,
            }).as('usuarioLoginn')

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

    static editarUsuarioComSucesso(){
        let produto = Factory.gerarUsuario()

        return cy.request({
            method: 'PUT',
            url: `/usuarios/${Cypress.env("idUser")}`,
            body: produto,
            failOnStatusCode: true,
        })
    }

    static excluirUsuarioComSucesso(){
        return cy.request({
            method: 'DELETE',
            url: `/usuarios/${Cypress.env("idUser")}`,
            failOnStatusCode: true,
        })
    }

    static excluirUsuarioAdmComSucesso(){
        return cy.request({
            method: 'DELETE',
            url: `/usuarios/${Cypress.env("idUserAdm")}`,
            failOnStatusCode: true,
        })
    }

    //Produtos-------------------------------------------------------------------
    static buscarProdutos(){
        return cy.rest('GET', URL_PRODUTOS)
    }

    static salvarIdProduto(resposta){
        Cypress.env('idPro', resposta.body._id)
    }

    static cadastrarProdutoComSucesso(){
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static buscarUmProdutoComSucesso(){
        return cy.request({
            method: 'GET',
            url: `/produtos/${Cypress.env("idPro")}`,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static editarProdutoComSucesso(){
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'PUT',
            url: `/produtos/${Cypress.env("idPro")}`,
            body: produto,
            failOnStatusCode: true,
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

    //Carrinhos-------------------------------------------------------------------

    static buscarCarrinhos(){
        return cy.rest('GET', URL_CARRINHOS)
    }

    static buscarProdutoParaCarrinho(){
        cy.request(URL_PRODUTOS).then( res => {
            Cypress.env('ranPro', res.body.produtos[0]._id)
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

    static salvarIdCarrinho(resposta){
        Cypress.env('idCarrinho', resposta.body._id)
    }

    
    static buscarUmCarrinhoComSucesso(){
        return cy.request({
            method: 'GET',
            url: `/carrinhos/${Cypress.env("idCarrinho")}`,
            failOnStatusCode: true
        })
    }


    static concluirCarrinho(){
        return cy.request({
            method: 'DELETE',
            url: '/carrinhos/concluir-compra',
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
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