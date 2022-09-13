/// <reference types="cypress" />

import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
import ServerestNegative from '../services/serverestNegative.service'

describe('Casos de teste negativos sobre a rota /usuarios da API Serverest', () => {

/*     it('Não deve cadastrar um novo usuário com um email já cadastrado', () => {
        cy.postarUsuarioExistente().then( res => {
            cy.contractValidator(res, 'post-usuarios', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })
    }) outdated*/

    it('CTN02 - Não deve cadastrar um novo usuário caso o email já esteja cadastrado', () => {
        ServerestNegative.buscarUsuarioParaCadastroNegativo()
        cy.get('@usuarioCadastro').then( res => {
            cy.log(res)
            ServerestNegative.cadastrarUsuarioSemSucesso(res).then( res => {
                expect(res.status).to.be.eq(400)
                cy.contractValidator(res, 'post-usuarios', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Este email já está sendo usado')
            })
        })
    })

    it('CTN03 - Não deve buscar um usuário com um ID não existente ', () => {
        ServerestNegative.buscarUmUsuarioSemSucesso().then( res => {
            expect(res.status).to.be.eq(400)
            cy.contractValidator(res, 'get-usuarios-id', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Usuário não encontrado')
        })
    })

    it('CTN04 - Não deve excluir um usuário com carrinho cadastrado', () => {
        ServerestNegative.buscarUsuarioComCarrinho()
        cy.get('@idUsuario').then( res => {
            ServerestNegative.excluirUsuarioSemSucesso(res).then( res => {
                expect(res.status).to.be.eq(400)
                cy.contractValidator(res, 'delete-usuarios', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Não é permitido excluir usuário com carrinho cadastrado')
            })
        })
    })

})